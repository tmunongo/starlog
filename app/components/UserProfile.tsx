import type { User } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { IoCalendarNumber } from "react-icons/io5";
import { formatDate } from "~/utils/formatDate";
import type { getUser } from "~/utils/login.server";
import ButtonAsLink from "./ButtonAsLink";
type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  dbUser: User;
  errorMessage?: string;
};

const UserProfile = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <div className="bg-bg_light_secondary dark:bg-bg_dark_secondary shadow-lg p-2 lg:p-0 flex lg:flex-col items-center justify-around lg:justify-start h-[240px] lg:h-3/4 w-full lg:w-[320px] lg:absolute my-4 lg:left-20 lg:top-32">
      <div className="h-full lg:h-1/2 w-1/3 flex items-center justify-center lg:w-full lg:block lg:m-auto overflow-hidden">
        <img src={data.dbUser.avatar} alt={data.dbUser.username} />
      </div>
      <div className="h-full lg:h-1/2 w-2/3 lg:w-full p-3 flex flex-col items-center lg:items-start justify-around">
        <div className="flex flex-col items-center justify-around h-full w-full">
          <span className="flex items-center justify-around">
            <IoCalendarNumber size={15} color="#6f6f6f" />
            <p className="italic text-gray-500 text-center">
              Member Since: {formatDate(data.dbUser.createdAt)}
            </p>
          </span>
          <h3 className="uppercase">about</h3>
          <p>{data.dbUser.about}</p>

          <p className="text-text_light_secondary dark:text-text_dark_secondary text-center text-sm">
            My Submissions: {data.dbUser.submissions.length}
          </p>
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-center text-sm">
            Places Visited: {data.dbUser.visitedIds.length}
          </p>
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-center text-sm">
            My Bucketlist: {data.dbUser.wishlistIds.length}
          </p>
        </div>
        <div className="block m-auto">
          <ButtonAsLink to={`/profile/edit/${data.dbUser.id}`}>
            Edit Your Profile
          </ButtonAsLink>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
