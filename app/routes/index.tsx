import { Place } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import ButtonAsLink from "~/components/ButtonAsLink";
import HomeLayout from "~/components/HomeLayout";

type LoaderData = {
  placeListItems: Place[];
};

export const loader: LoaderFunction = async () => {
  const placeListItems = await prisma.place.findMany({
    orderBy: { overallRating: "desc" },
  });

  const data: LoaderData = { placeListItems };

  return json(data);
};

export default function Index() {
  const places = useLoaderData<LoaderData>() as unknown as LoaderData;
  let isLoggedIn = false;
  return (
    <HomeLayout>
      <div className="h-screen w-screen flex flex-col items-center justify-start my-2">
        <div className="absolute top-2 right-2 md:right-12">
          {isLoggedIn ? (
            // Will be replaced with a profile icon
            <ButtonAsLink to="/profile">Hi, UserX</ButtonAsLink>
          ) : (
            <ButtonAsLink to="/join">Not Logged In</ButtonAsLink>
          )}
        </div>
        <div className="mt-6 p-4 rounded-md h-full w-full md:w-4/5">
          <h2>Explore New Places</h2>
          <h3 className="text-slate-600">
            Pick a Category to Find What You're Looking For
          </h3>
          <div className="w-full md:w-4/5 border-y">
            <span className="pl-1">Filters:</span>
          </div>
          <div className="flex items-start justify-around">
            {places.placeListItems.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
