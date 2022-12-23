import { Listbox } from "@headlessui/react";
import type { Place } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import { useState } from "react";
import { MdArrowDropDown, MdCheck } from "react-icons/md";
import Advertisment from "~/components/Advertisment";
import FilterItem from "~/components/FilterItem";
import HomeLayout from "~/components/HomeLayout";
import HomePlace from "~/components/HomePlace";
import { getUnique } from "~/utils/getUnique";
import { getUser, logout } from "../utils/login.server";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Home | Truvaille",
  viewport: "width=device-width,initial-scale=1",
});

const filterOptions = [
  { label: "Country", value: "country" },
  { label: "City", value: "city" },
  { label: "Category", value: "category" },
];

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
  const [filterCriteria, setFilterCriteria] = useState<string>("City");
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  // let isLoggedIn = false;

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const getFilterCategory = (value: string) => {
    switch (value) {
      case "Category":
        return getUnique(data.placeListItems).map((item, index) => (
          <span key={index} onClick={() => handleFilter(item.category)}>
            <FilterItem>{item.category}</FilterItem>
          </span>
        ));
      case "Country":
        return getUnique(data.placeListItems).map((item, index) => (
          <span key={index} onClick={() => handleFilter(item.country)}>
            <FilterItem>{item.country}</FilterItem>
          </span>
        ));
      case "City":
        return getUnique(data.placeListItems).map((item, index) => (
          <span key={index} onClick={() => handleFilter(item.city)}>
            <FilterItem>{item.city}</FilterItem>
          </span>
        ));
      default:
        return;
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen w-screen flex flex-col items-center justify-start my-2">
        <div className="flex flex-col md:flex-row items-start justify-around">
          <div className="mt-6 md:p-4 rounded-md h-full w-full md:w-4/5">
            <p className="text-lg dark:text-white md:text-xl px-2">Explore New Places</p>
            <p className="text-slate-600 dark:text-white text-base md:text-lg px-2">
              Pick a Category to Find What You're Looking For
            </p>
            <div className="w-full h-14 flex items-center justify-start">
              <span className="pl-2 text-lg flex items-center justify-start w-2/3">
                {/* Filter must be a drop down menu */}
                <span className="flex flex-col items-center justify-end ml-1 mr-4">
                  <Listbox
                    as="div"
                    value={filterCriteria}
                    onChange={setFilterCriteria}
                  >
                    <Listbox.Button className="flex items-center justify-around w-full border border-black dark:border-white rounded-lg p-1 dark:text-white">
                      {filterCriteria}
                      <span className="dark:text-white">
                        <MdArrowDropDown size={15} />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute bg-white z-[100] p-2 rounded-lg border border-black mt-2">
                      {filterOptions.map((item, index) => {
                        return (
                          <Listbox.Option
                            key={index}
                            value={item.label}
                            className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black cursor-grab p-2 border-b-[0.5px] border-gray-300"
                          >
                            {({ selected, active }) => (
                              <span
                                className={`${selected}
                            ? "text-white bg-blue-600"
                            : "text-gray-900" flex items-center justify-between`}
                              >
                                {" "}
                                {selected && <MdCheck size={15} />}
                                {item.label}
                              </span>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Listbox>
                </span>
                <span onClick={() => handleFilter("")}>
                  <FilterItem>All</FilterItem>
                </span>
                {getFilterCategory(filterCriteria)?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </span>
            </div>
            <div className="flex flex-col items-start justify-around">
              {filter == ""
                ? data.placeListItems.map((item, index) => (
                  <HomePlace key={index} place={item} />
                ))
                : data.placeListItems
                  .filter(
                    (place) => place[filterCriteria.toLowerCase()] == filter
                  )
                  .map((item, index) => <HomePlace key={index} place={item} />)}
            </div>
          </div>
          <div className="w-full md:w-auto md:mt-[150px] flex flex-col md:items-start items-center justify-start">
            <Advertisment />
            <Advertisment />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
