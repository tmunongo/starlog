import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  UploadHandler,
} from "@remix-run/node";
import {
  json,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";

import { Form, useActionData, useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import { MdCamera } from "react-icons/md";
import PlacesLayout from "~/components/PlacesLayout";
import { calcCostRating } from "~/utils/calcCostRating.server";
import { uploadImage } from "~/utils/cloudinaryUpload.server";
import { getUser } from "~/utils/login.server";

type Props = {};

type ActionData = {
  errorMsg?: string;
};

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
  const user = await getUser(request);

  if (!user) {
    return json({
      error: "You must be logged in to submit a place",
    });
  }

  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      if (name !== "image") {
        return undefined;
      }
      const uploadedImage = await uploadImage(data);
      console.log(uploadedImage);
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  console.log(formData);
  const imgSrc = formData.get("image");
  const placeName = formData.get("name");
  const country = formData.get("country");
  const city = formData.get("city");
  const category = formData.get("category");
  const tags = formData.get("tags");
  const budget = formData.get("budget");
  if (!imgSrc || !placeName || country || !city || !category || !tags) {
    return json({
      error: "something wrong",
    });
  }
  const newPlace = await prisma.place.create({
    data: {
      name: String(placeName),
      country: String(country),
      city: String(city),
      category: String(category),
      tags: String(tags),
      coverImage: String(imgSrc),
      budget: Number(budget),
      costRating: calcCostRating(Number(budget)),
      submitterId: user.id,
    },
  });
  console.log(newPlace);
  return redirect(`/places/${newPlace.id}`);
};

export const meta: MetaFunction = () => ({
  title: "New | Seven Wonders",
});

const NewPlace = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  const actionData = useActionData<ActionData>();

  return (
    <PlacesLayout>
      <div className="mx-1 md:mx-[20%]">
        <h2 className="my-2">Add a new location</h2>
        <p className="my-2 text-gray-600">
          Share your favorite place with the Seven Wonders community.
        </p>
        <div>
          <Form
            method="post"
            encType="multipart/form-data"
            className="flex flex-col items-center justify-around border-black rounded-md shadow-lg p-2"
          >
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-start justify-start w-[30%] md:w-[40%]">
                <label
                  htmlFor="name"
                  className="text-lg md:text-xl p-2 m-1 md:m-4"
                >
                  Name
                </label>
                <label
                  htmlFor="country"
                  className="text-lg md:text-xl p-2 m-1 md:m-4"
                >
                  Country
                </label>
                <label
                  htmlFor="city"
                  className="text-lg md:text-xl p-2 m-1 md:m-4"
                >
                  City
                </label>
                <label
                  htmlFor="category"
                  className="text-lg md:text-xl p-2 m-1 md:m-4"
                >
                  Category
                </label>
                <label
                  htmlFor="tags"
                  className="text-lg md:text-xl p-2 m-1 md:m-4"
                >
                  Tags
                </label>
                <label
                  htmlFor="budget"
                  className="text-lg md:text-xl p-2 m-1 md:m-4"
                >
                  Budget
                </label>
                <label htmlFor="image" className="p-2 m-1 md:m-4">
                  <MdCamera size={20} />
                </label>
              </div>
              <div className="flex flex-col items-start justify-start w-[65%] md:w-[40%]">
                <input
                  type="text"
                  name="name"
                  placeholder="Hero's Acre"
                  className="rounded-md h-12 w-full md:w-2/3 p-2 m-1 md:m-4"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Zimbabwe"
                  className="rounded-md h-12 w-full md:w-2/3 p-2 m-1 md:m-4"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Harare"
                  className="rounded-md h-12 w-full md:w-2/3 p-2 m-1 md:m-4"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Historical Site"
                  className="rounded-md h-12 w-full md:w-2/3 p-2 m-1 md:m-4"
                />
                <input
                  type="text"
                  name="tags"
                  autoComplete="true"
                  placeholder="Family Friendly, Live Band, 24/7"
                  className="rounded-md h-12 w-full md:w-2/3 p-2 m-1 md:m-4"
                />
                <input
                  type="number"
                  name="budget"
                  autoComplete="true"
                  placeholder="$39.99"
                  className="rounded-md h-12 w-full md:w-2/3 p-2 m-1 md:m-4"
                />
                <input
                  id="img-field"
                  type="file"
                  accept="image/*"
                  name="image"
                  alt="Upload"
                  className="p-2 m-1 md:m-4 border border-black rounded-md bg-slate-400 w-full md:w-2/3"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <button type="submit" className="p-2 bg-myr rounded-md">
                Submit
              </button>
              <span className="italic text-gray-600">
                All fields are required
              </span>
            </div>
          </Form>
          {actionData?.errorMsg && <h2>{actionData.errorMsg}</h2>}
        </div>
      </div>
    </PlacesLayout>
  );
};

export default NewPlace;
