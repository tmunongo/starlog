import { Place } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import { useState } from "react";
import ButtonAsLink from "~/components/ButtonAsLink";
import FilterItem from "~/components/FilterItem";
import HomeLayout from "~/components/HomeLayout";
import HomePlace from "~/components/HomePlace";
import { getUnique } from "~/utils/getUnique";

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
  const [filter, setFilter] = useState<string>("");
  const places = useLoaderData<LoaderData>() as unknown as LoaderData;
  let isLoggedIn = false;

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <HomeLayout>
      <div className="h-screen w-screen flex flex-col items-center justify-start my-2">
        <div className="absolute top-2 right-2 md:right-12">
          {isLoggedIn ? (
            // Will be replaced with a profile icon
            <ButtonAsLink to="/profile">Hi, UserX</ButtonAsLink>
          ) : (
            <ButtonAsLink to="/signup">Not Logged In</ButtonAsLink>
          )}
        </div>
        <div className="mt-6 p-4 rounded-md h-full w-full md:w-4/5">
          <h2>Explore New Places</h2>
          <h3 className="text-slate-600">
            Pick a Category to Find What You're Looking For
          </h3>
          <div className="w-full border-y h-14 flex items-center justify-start">
            <span className="pl-2 text-lg">
              Filter:
              <span onClick={() => handleFilter("")}>
                <FilterItem>All</FilterItem>
              </span>
              {getUnique(places.placeListItems).map((item, index) => (
                <span key={index} onClick={() => handleFilter(item.category)}>
                  <FilterItem>{item.category}</FilterItem>
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col items-start justify-around">
            {filter == ""
              ? places.placeListItems.map((item, index) => (
                  <HomePlace key={index} place={item} />
                ))
              : places.placeListItems
                  .filter((place) => place.category == filter)
                  .map((item, index) => <HomePlace key={index} place={item} />)}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
