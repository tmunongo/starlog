import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import prisma from "prisma/db.server";

type LoginForm = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return null;

  const verifiedPass = await bcrypt.compare(
    String(password),
    user!.hashedPassword
  );

  if (!user || verifiedPass) {
    // this user cannot be authenticated
    return null;
  }
  return { id: user.id, email };
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

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
