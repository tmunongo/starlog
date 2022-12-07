import type { Place } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import HomeLayout from "~/components/HomeLayout";
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
    <HomeLayout>
      <p>Place details will be here</p>
    </HomeLayout>
  );
};

export default PlaceDetailsPage;
