import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import prisma from "prisma/db.server";

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export async function login({ email, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }

  const verifiedPass = await bcrypt.compare(password, user.hashedPassword);

  if (!user || !verifiedPass) {
    // this user cannot be authenticated
    return null;
  }
  return { id: user.id, email };
}

export async function register({ email, username, password }: RegisterForm) {
  const saltRounds = 10;
  // This is actually for signing up
  const hashed = await bcrypt.hash(String(password), saltRounds);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      username: username,
      hashedPassword: hashed,
      about: "Tell us a little bit about yourself",
      avatar:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1670981381/seven-wonders/avatars/Photo_12-12-2022_21_45_06_xkn6f9.jpg",
    },
  });
  if (!newUser) {
    // this user cannot be authenticated
    return null;
  }
  return { id: newUser.id, email };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set!");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "sw_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

// retrieve user info
const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login/${searchParams}`);
  }
  return userId;
}

// get user
export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
