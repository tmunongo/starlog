import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlacesLayout from "~/components/PlacesLayout";
import UserProfile from "~/components/UserProfile";
import { getUser } from "~/utils/login.server";
import prisma from "prisma/db.server.ts";
import type { User } from "@prisma/client";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  user: User;
  errorMessage?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  dbUser = await prisma.user.findUnique({
  where: {
     username:  user.username,
  },
  include: {
    submissions: true,
    wishlist: true,
    visited: true
  }
  });

  if (!dbUser){
    return "User not found";
  }

  const data: LoaderData = {
    dbUser,
    user
  };

  return json(data);
};

const Profile = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  console.log(data);
  
  return (
    <PlacesLayout>
      <div className="flex flex-col md:flex-row items-start justify-center mx-3 md:ml-[33%] min-h-screen">
        <UserProfile />
        <div className="flex flex-col w-full h-full items-start justify-around p-2 md:p-8">
          <p>Joined: {data.dbUser.createdAt} </p>
          <div className="flex items-center justify-around overflow-x-scroll h-[200px] w-full md:w-4/5 border-b-2 border-black dark:border-oranj my-2">
          {data.dbUser.wishlist ? 
            data.dbUser.wishlist.map((item, index) => {
              return(
              <div key={index}       
            style={{
              backgroundImage: `url(${item.coverImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
              className="rounded-md my-1 shadow-md">
                <p>
                  {item.name}
                </p>
                <p>
                  {item.city}, {item.country}
                </p>
              </div>
            
            );
            })
           : 
            <div className="h-full w-1/3">
              <h2>You have not added any places to your wishlist</h2>
            </div>
          }  
          </div>

          <div className="flex items-center justify-end overflow-x-scroll h-[200px] w-full md:w-4/5 border-b-2 border-black dark:border-oranj">
            
          </div>
        </div>
      </div>
    </PlacesLayout>
  );
};

export default Profile;
