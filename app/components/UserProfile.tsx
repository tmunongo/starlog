import React from 'react';
import ButtonAsLink from "./ButtonAsLink";
import { useLoaderData } from "@remix-run/react";
import { IoCalendarNumber } from "react-icons/io5"
type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  user: User;
  errorMessage?: string;
}

const UserProfile = (props: Props) => { 
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <div className="shadow-lg p-2 md:p-0 flex md:flex-col items-center justify-around md:justify-start h-[200px] md:h-3/4 w-full md:w-[320px] md:absolute my-4 md:left-20 md:top-32">
      <div className="h-full md:h-1/2 w-1/3 flex items-center justify-center md:w-full md:block md:m-auto">
        <img src={data.dbUser.avatar} alt={data.dbUser.username} />
      </div>
      <div className="h-full md:h-1/2 w-2/3 md:w-full p-3 flex flex-col items-center md:items-start justify-around">
        <div className="flex flex-col items-center justify-around h-full w-full">
          <span className="flex items-center justify-around">

          <IoCalendarNumber size={15} color="#6f6f6f"/> 
          <p className="italic text-gray-500">
          Member Since: {data.dbUser.createdAt}</p>
          </span>
          <h3 className="uppercase">about</h3>
          <p>{data.dbUser.about}</p>

          <p>My Submissions: {data.dbUser.submissions.length}</p>
          <p>Places Visited: {data.dbUser.visitedIds.length}</p>
          <p>My Bucketlist: {data.dbUser.wishlistIds.length}</p>
        </div>
        <div className="block m-auto">
          <ButtonAsLink to={`/profile/edit/${data.dbUser.id}`}>Edit Your Profile</ButtonAsLink>
        </div>
      </div>
    </div>
  )
};

export default UserProfile;
