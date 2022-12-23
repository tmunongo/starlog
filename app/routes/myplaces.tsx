import React from 'react';
import PlacesLayout from '../components/PlacesLayout';
// import HomePlace from '../components/HomePlace.tsx';
import PlaceSummary from '../components/PlaceSummary.tsx';
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/login.server";
import prisma from "prisma/db.server.ts";
import type { User } from "@prisma/client";

type Props = {}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "My Places | Truvaille",
  viewport: "width=device-width,initial-scale=1",
});

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
  include: {
    submissions: true,
  }
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

const MyPlaces = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  console.log(data.dbUser.submissions);  
  return (
    <PlacesLayout>
    <div className="flex flex-col items-start justify-start w-full">
      <div className="block m-auto">
        <h2>My Submissions</h2>
      </div>
      <div className="grid grid-cols-3 gap-1 px-2 md:px-[5%] w-full">
        {data.dbUser.submissions.map((item, index) => {
          return (
            <PlaceSummary place={item} key={index} />
          )
        })} 
      </div>
    </div>
    </PlacesLayout>
  )
}

export default MyPlaces
