import type { Place } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import { useState } from "react";
import FilterItem from "~/components/FilterItem";
import HomeLayout from "~/components/HomeLayout";
import HomePlace from "~/components/HomePlace";
import { getUnique } from "~/utils/getUnique";
import { getUser, logout } from "../utils/login.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  placeListItems: Place[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const placeListItems = await prisma.place.findMany({
    orderBy: { overallRating: "desc" },
  });

  const data: LoaderData = {
    user,
    placeListItems,
  };

  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export default function Index() {
  const [filter, setFilter] = useState<string>("");
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  // let isLoggedIn = false;

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <HomeLayout>
      <div className="h-screen w-screen flex flex-col items-center justify-start my-2">
        <div className="mt-6 p-4 rounded-md h-full w-full md:w-4/5">
          <p className="text-lg md:text-xl">Explore New Places</p>
          <p className="text-slate-600 text-base md:text-lg">
            Pick a Category to Find What You're Looking For
          </p>
          <div className="w-full border-y h-14 flex items-center justify-start">
            <span className="pl-2 text-lg">
              Filter:
              <span onClick={() => handleFilter("")}>
                <FilterItem>All</FilterItem>
              </span>
              {getUnique(data.placeListItems).map((item, index) => (
                <span key={index} onClick={() => handleFilter(item.category)}>
                  <FilterItem>{item.category}</FilterItem>
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col items-start justify-around">
            {filter == ""
              ? data.placeListItems.map((item, index) => (
                  <HomePlace key={index} place={item} />
                ))
              : data.placeListItems
                  .filter((place) => place.category == filter)
                  .map((item, index) => <HomePlace key={index} place={item} />)}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
