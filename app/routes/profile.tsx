import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlacesLayout from "~/components/PlacesLayout";
import UserProfile from "~/components/UserProfile";
import { getUser } from "~/utils/login.server";
import prisma from "prisma/db.server.ts";
import type { User } from "@prisma/client";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  user: User;
  errorMessage?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  dbUser = await prisma.user.findUnique({
  where: {
     username:  user.username,
  },
  });

  if (!dbUser){
    return "User not found";
  }

  const data: LoaderData = {
    dbUser,
    user
  };

  return json(data);
};

const Profile = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  // console.log(data);
  
  return (
    <PlacesLayout>
      <div>
        <UserProfile />
      </div>
    </PlacesLayout>
  );
};

export default Profile;
