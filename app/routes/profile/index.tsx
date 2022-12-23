import type { User } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/db.server";
import Carousel from "~/components/Carousel";
import PlacesLayout from "~/components/PlacesLayout";
import UserProfile from "~/components/UserProfile";
import { getUser } from "~/utils/login.server";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  dbUser: User;
  errorMessage?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
    include: {
      submissions: true,
      wishlist: true,
      visited: true,
    },
  });

  if (!dbUser) {
    return "User not found";
  }

  const data: LoaderData = {
    dbUser,
    user,
  };

  return json(data);
};

const Profile = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <PlacesLayout>
      <div className="flex flex-col lg:flex-row items-start justify-center mx-3 lg:ml-[33%] min-h-screen">
        <UserProfile />
        <div className="flex flex-col w-full h-full items-start justify-around p-2 md:p-8">
          {/* <div className="flex items-center justify-center h-max w-full md:w-4/5 border-b-2 border-black dark:border-oranj pb-1"> */}
          <div className="flex flex-col items-start justify-center w-full border-b-2 border-black dark:border-oranj">
            {/* {data.dbUser.submissions.map((item: Place, index: number) => {
              return <PlaceSummary place={item} key={index} />;
            })} */}
            <h2 className="w-full text-center">My Submissions</h2>
            {data.dbUser.submissions.length > 0 ? (
              <Carousel items={data.dbUser.submissions} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h3 className="text-2xl text-gray-800 dark:text-gray-300">
                  You have no submissions yet
                </h3>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start justify-center w-full border-b-2 border-black dark:border-oranj">
            <h2 className="w-full text-center">My Wishlist</h2>
            {data.dbUser.wishlist.length > 0 ? (
              <Carousel items={data.dbUser.wishlist} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h3 className="text-2xl text-gray-800 dark:text-gray-300">
                  Find some cool places and add to your wish list
                </h3>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start justify-center w-full border-b-2 border-black dark:border-oranj">
            <h2 className="w-full text-center">My History</h2>
            {data.dbUser.visited.length > 0 ? (
              <Carousel items={data.dbUser.visited} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h3 className="text-2xl text-gray-800 dark:text-gray-300">
                  Tell us where you've been
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </PlacesLayout>
  );
};

export default Profile;
