import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { MdCamera } from "react-icons/md";
import PlacesLayout from "~/components/PlacesLayout";
import { getUser, logout } from "~/utils/login.server";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const data: LoaderData = {
    user,
  };

  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

const NewPlace = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <PlacesLayout>
      <div className="mx-1 md:mx-[20%]">
        <h2>Add a new location</h2>
        <p>Our site depends on your contributions</p>
        <div>
          <Form
            action="post"
            className="flex flex-col items-center justify-around border border-black rounded-md shadow-md p-2"
          >
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-start justify-start w-[40%]">
                <label htmlFor="name" className="text-lg md:text-xl p-2 m-4">
                  Name
                </label>
                <label htmlFor="country" className="text-lg md:text-xl p-2 m-4">
                  Country
                </label>
                <label htmlFor="city" className="text-lg md:text-xl p-2 m-4">
                  City
                </label>
                <label
                  htmlFor="category"
                  className="text-lg md:text-xl p-2 m-4"
                >
                  Category
                </label>
                <label htmlFor="tags" className="text-lg md:text-xl p-2 m-4">
                  Tags
                </label>
                <label htmlFor="image" className="p-2 m-4">
                  <MdCamera size={20} />
                </label>
              </div>
              <div className="flex flex-col items-start justify-start w-[40%]">
                <input
                  type="text"
                  name="name"
                  placeholder="Hero's Acre"
                  className="rounded-md h-12 w-2/3 p-2 m-4"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Zimbabwe"
                  className="rounded-md h-12 w-2/3 p-2 m-4"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Harare"
                  className="rounded-md h-12 w-2/3 p-2 m-4"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Historical Site"
                  className="rounded-md h-12 w-2/3 p-2 m-4"
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Family Friendly, Live Band, 24/7"
                  className="rounded-md h-12 w-2/3 p-2 m-4"
                />
                <input
                  id="img-field"
                  type="file"
                  accept="image/*"
                  name="image"
                  alt="Upload"
                  className="p-2 m-4 border border-black rounded-md bg-slate-400"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <button type="submit" className="p-2 bg-myr rounded-md">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </PlacesLayout>
  );
};

export default NewPlace;
