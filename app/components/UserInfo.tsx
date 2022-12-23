import { Form, useLoaderData } from "@remix-run/react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { getUser } from "~/utils/login.server";
import ButtonAsLink from "./ButtonAsLink";
import LinkButtonElement from "./LinkButtonElement";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

const UserInfo = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  <></>;
  return (
    // {/* user profile and log out buttons */}
    <div className="absolute top-3 md:top-4 right-2 md:right-12 text-text_dark_primary dark:text-text_light_primary">
      {data.user ? (
        // Will be replaced with a profile icon
        <div className="flex justify-around items-center">
          <span className="mx-2 bg-highlights_light dark:bg-highlights_dark rounded-md p-1">
            <Form
              action="/logout"
              method="post"
              className="flex justify-center items-center p-[1px] md:p-1"
            >
              <button type="submit">
                <AiOutlinePoweroff size={25} />
              </button>
            </Form>
          </span>
          <LinkButtonElement to="/profile">
            <span>Hi, {data.user.username}</span>
          </LinkButtonElement>
        </div>
      ) : (
        <ButtonAsLink to="login">Not Logged In</ButtonAsLink>
      )}
    </div>
  );
};

export default UserInfo;
