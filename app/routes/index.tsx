import { Place } from "@prisma/client";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import ButtonAsLink from "~/components/ButtonAsLink";
import FilterItem from "~/components/FilterItem";
import HomeLayout from "~/components/HomeLayout";
import HomePlace from "~/components/HomePlace";
import LinkButtonElement from "~/components/LinkButtonElement";
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
        <div className="absolute top-2 right-2 md:right-12">
          {data.user ? (
            // Will be replaced with a profile icon
            <div className="flex justify-around items-center">
              <span className="mx-4 bg-[#FCA311] rounded-md p-1 cursor-grab">
                <Form action="/logout" method="post">
                  <button type="submit">
                    <AiOutlinePoweroff size={25} />
                  </button>
                </Form>
              </span>
              <LinkButtonElement to="/profile">
                <span>Hi, {data.user.username}</span>
              </LinkButtonElement>
            </div>
          ) : (
            <ButtonAsLink to="/login">Not Logged In</ButtonAsLink>
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
