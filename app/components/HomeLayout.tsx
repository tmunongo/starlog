import type { Place } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
// import { useRef } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { MdClose, MdMenu } from "react-icons/md";
import type { getUser } from "~/utils/login.server";
import ButtonAsLink from "./ButtonAsLink";
import ContributeBannerBox from "./ContributeBannerBox";
import JoinBannerBox from "./JoinBannerBox";
import LinkButtonElement from "./LinkButtonElement";
import { NavMenu } from "./NavMenu";

type Props = {
  children: any;
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  placeListItems: Place[];
};

const HomeLayout = ({ children }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <>
      {/* user profile and log out buttons */}
      <div className="absolute top-2 right-2 md:right-12">
        {data.user ? (
          // Will be replaced with a profile icon
          <div className="flex justify-around items-center">
            <span className="mx-2 bg-myr rounded-md p-2 cursor-grab">
              <Form
                action="/logout"
                method="post"
                className="flex justify-center items-center"
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
      {/* Side menu toggle button */}
      <div id="nav-btn-container">
        <button id="nav-button" onClick={toggleOpen}>
          {isOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
        </button>
      </div>
      {/* side menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            <NavMenu />
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-center justify-start w-screen min-h-screen">
        {/* <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex items-end justify-end h-[75vh] w-full"> */}
        {/* <div className="absolute top-2 left-2 md:left-12 md:top-6 p-2 bg-gray-400 rounded-full"> */}
        {/* </div> */}

        <div className="bg-hero-image bg-center bg-cover  text-white flex items-end justify-end h-[65vh] w-full">
          {/* add login check */}
          {data.user ? <ContributeBannerBox /> : <JoinBannerBox />}
        </div>
        <div className="bg-mintgreen w-full">{children}</div>
      </div>
    </>
  );
};

export default HomeLayout;
