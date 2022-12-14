import React from 'react';
import ButtonAsLink from "./ButtonAsLink";
import { useLoaderData } from "@remix-run/react";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  user: User;
  errorMessage?: string;
}

const UserProfile = (props: Props) => { 
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <div className="shadow-lg flex md:flex-col items-center justify-around md:justify-start h-[200px] md:h-3/4 w-full md:w-[320px] md:absolute my-4 md:left-8 md:top-32">
      <div className="h-full md:h-1/2 w-1/3 md:w-full block m-auto">
        <img src={data.dbUser.avatar} alt={data.dbUser.username} />
      </div>
      <div className="h-full md:h-1/2 w-2/3 md:w-full p-3 flex flex-col items-center md:items-start justify-around">
        <div className="flex flex-col items-center justify-around h-full">
          <p className="uppercase">about</p>
          <p>{data.dbUser.about}</p>
          <p>My Bucketlist: {data.dbUser.wishlistIds.length}</p>
        </div>

          <ButtonAsLink to={`/profile/edit/${data.dbUser.id}`}>Edit Your Profile</ButtonAsLink>
      </div>
    </div>
  )
};

export default UserProfile;
