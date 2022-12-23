import type { Place } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import PlacesLayout from "~/components/PlacesLayout";
import { getUser } from "~/utils/login.server";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  placeItem: Place;
  errorMsg?: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);
  const placeItem = await prisma.place.findUnique({
    where: {
      id: params.placeId,
    },
  });

  if (!placeItem) {
    return json({
      errorMsg: "something wrong",
    });
  }

  const data: LoaderData = {
    user,
    placeItem,
  };

  return json(data);
};

const PlaceDetailsPage = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <PlacesLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-around md:justify-start md:m-2 md:mx-[10%] p-2 w-screen">
        <div className="w-full md:w-1/3 p-2">
          <div className="rounded-md h-80 w-full md:w-48 flex flex-col items-center justify-around bg-gray-200 shadow-md p-2">
            <img
              src={data.placeItem.coverImage}
              alt={data.placeItem.name}
              className="rounded-md"
            />
            <div className="bg-subtext p-1 rounded-lg">
              <p>{data.placeItem.city},</p>
              <p>{data.placeItem.country}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3"></div>
      </div>
    </PlacesLayout>
  );
};

export default PlaceDetailsPage;
