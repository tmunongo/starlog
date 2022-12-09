import { ActionFunction, json } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
// import { createServerClient } from "@supabase/auth-helpers-remix";
import prisma from "prisma/db.server";
import { useState } from "react";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiOutlineTwitter,
} from "react-icons/ai";
import { validateUrl } from "~/utils/validateUrl";
import { createUserSession, login, register } from "../utils/login.server";

type Props = {};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username?: string | undefined;
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    email: string;
    username?: string;
    password: string;
  };
};

// Helper functions
function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

const validateEmail = (email: unknown) => {
  const val = String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return val ? undefined : `You have entered an invalid email address`;
};

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username") || "";
  const email = form.get("email");
  const password = form.get("password");
  const response = new Response();
  const redirectTo = validateUrl(form.get("redirectTo") || "/");
  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, email, username, password };
  const fieldErrors =
    loginType == "register"
      ? {
          email: validateEmail(email),
          username: validateUsername(username),
          password: validatePassword(password),
        }
      : {
          email: validateEmail(email),
          password: validatePassword(password),
        };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case "login": {
      const user = await login({ email, password });
      // console.log(user);
      if (!user) {
        return badRequest({
          fields,
          formError: `Username/Password combination is incorrect`,
        });
      }
      // if there is a user, create their session and redirect to Home
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: String(email),
            },
            {
              username: String(username),
            },
          ],
        },
      });
      if (user) {
        return badRequest({
          fields,
          formError: `User with the email ${email} or username ${username} already exists`,
        });
      }
      const thisUser = await register({ email, username, password });
      if (!thisUser) {
        return badRequest({
          fields,
          formError: `Your registration could not be validated`,
        });
      }
      return createUserSession(thisUser.id, redirectTo);
    }
    default: {
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
    }
  }
  // const supabaseClient = createServerClient(
  //   process.env.SUPABASE_URL!,
  //   process.env.SUPABASE_ANON_KEY!,
  //   { request, response }
  // );
  // // }
  // const { data, error } = await supabaseClient?.auth.signInWithPassword({
  //   email: String(email),
  //   password: String(password),
  // });

  // headers must be returned with the loader response for the set-cookie header to be set
  // return json(
  //   { user },
  //   {
  //     headers: response.headers,
  //   }
  // );
};

const Login = (props: Props) => {
  // const { user } = useActionData();
  const [authType, setAuthType] = useState("login");
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  console.log(actionData);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center  h-4/5 w-full md:w-1/2 shadow-md p-4">
        <form
          method="post"
          className="flex flex-col items-center justify-center border-b-2 pb-5"
        >
          {authType == "login" ? (
            <h2 className="my-2 underline underline-offset-2 decoration-green-600 ">
              Login
            </h2>
          ) : (
            <h2 className="my-2">Register</h2>
          )}
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <fieldset>
            <legend className="sr-only">Login or Register?</legend>
            <label className="m-2">
              <input
                type="radio"
                name="loginType"
                value="login"
                onClick={() => setAuthType("login")}
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                onClick={() => setAuthType("register")}
                defaultChecked={actionData?.fields?.loginType === "register"}
              />{" "}
              Register
            </label>
          </fieldset>
          <label htmlFor="email" className="text-lg my-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="p-2 h-10 w-80 border border-black rounded-2xl"
            defaultValue={actionData?.fields?.email}
            aria-invalid={Boolean(actionData?.fieldErrors?.email)}
            aria-errormessage={
              actionData?.fieldErrors?.email ? "email-error" : undefined
            }
          />
          {actionData?.fieldErrors?.email ? (
            <p className="" role="alert" id="email-error">
              {actionData.fieldErrors.email}
            </p>
          ) : null}
          {authType == "register" ? (
            <>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                className="p-2 h-10 w-80 border border-black rounded-2xl"
                aria-errormessage={
                  actionData?.fieldErrors?.username
                    ? "username-error"
                    : undefined
                }
              />
            </>
          ) : (
            <span></span>
          )}
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            className="p-2 h-10 w-80 border border-black rounded-2xl"
            defaultValue={actionData?.fields?.password}
            aria-invalid={
              Boolean(actionData?.fieldErrors?.password) || undefined
            }
            aria-errormessage={
              actionData?.fieldErrors?.password ? "password-error" : undefined
            }
          />
          {actionData?.fieldErrors?.password ? (
            <p
              className="form-validation-error"
              role="alert"
              id="password-error"
            >
              {actionData.fieldErrors.password}
            </p>
          ) : null}
          {authType == "login" ? (
            <button type="submit" className="bg-orange-400 p-2 m-2 rounded-md">
              Login
            </button>
          ) : (
            <button type="submit" className="bg-orange-400 p-2 m-2 rounded-md">
              Register
            </button>
          )}
          {/* <button type="submit" className="bg-orange-400 p-2 m-2 rounded-md">
          Login
        </button> */}
          {/* <Link to="/signup">
          <span>No account? Join here.</span>
        </Link> */}
          {actionData?.formError ? (
            <div className="grid place-items-center">
              <p className="text-red-500 italic">{actionData.formError}</p>
              <p className="text-red-500 italic">
                If you do not have an account, you may register an account
                above.
              </p>
            </div>
          ) : (
            <></>
          )}
        </form>
        <div className="flex flex-col items-center justify-between mt-5 p-2 w-4/5">
          <p className="text-lg">Use Your Social Account to Log In</p>
          <div className="flex items-center justify-between w-3/5 my-4">
            <span className="">
              <AiFillFacebook size={40} color="#00f" />
            </span>
            <span className="">
              <AiFillGoogleCircle size={40} color="" />
            </span>
            <span className="">
              <AiOutlineTwitter size={40} color="#06c" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
