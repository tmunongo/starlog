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
import Logo from "../../assets/trouvaille1.png";

import { NavMenu } from "./NavMenu";

type Props = {
  children: any;
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  placeListItems: Place[];
};

const array = ["1", "2", "3", "4", "5"];

const HomeLayout = ({ children }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  // const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <div className="absolute top-0 w-screen h-16">
        {/* user profile and log out buttons */}
        <div className="absolute top-3 right-2 md:right-12">
          {data.user ? (
            // Will be replaced with a profile icon
            <div className="flex justify-around items-center">
              <span className="mx-2 bg-greeny dark:bg-oranj rounded-md p-2 cursor-grab">
                <Form
                  action="/logout"
                  method="post"
                  className="flex justify-center items-center"
                >
                  <button className="p-1" type="submit">
                    <AiOutlinePoweroff size={20} />
                  </button>
                </Form>
              </span>
              <LinkButtonElement to="/profile">
                <span className="font-montserrat">Hi, {data.user.username}</span>
              </LinkButtonElement>
            </div>
          ) : (
            <ButtonAsLink to="login">Log In</ButtonAsLink>
          )}
        </div>
        {/* Side menu toggle button */}
        <div id="nav-btn-container">
          <button id="nav-button" onClick={toggleOpen}>
            {isOpen ? <MdClose size={25} color={"#da4620"} /> : <MdMenu size={25} color={"#da4620"} />}
          </button>
        </div>
        <div className="absolute flex items-center left-14 md:left-20 top-2 md:top-3 md:dark:bg-oranj rounded-lg p-2 px-3">
          <img className="h-10 w-auto md:mr-3 rounded-md" src={Logo} alt="logo" />
          <a href="/">
            <span className="hidden md:flex font-montserrat md:text-2xl">trouvaille</span>
          </a>
        </div>
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
      {/* Banner */}
      <div className="flex bg-hero-light dark:bg-hero-dark flex-col items-center justify-start w-screen min-h-screen">
        <div className="bg-hero-light dark:bg-hero-dark bg-bottom bg-cover flex flex-col items-start justify-center h-[65vh] w-full">
           {/* add login check  
           {data.user ? <ContributeBannerBox /> : <JoinBannerBox />} */}
            <h2 className="capitalize text-black dark:text-white w-full px-[5%] md:px-[15%]">A great big world awaits</h2>
            <Form method='get' className="text-gray-700 :w
            flex items-center justify-start w-full px-[5%] md:px-[15%] my-4">
              <input name="search" placeholder="Try 'Addis Ababa'" className="p-2 w-1/2 md:w-2/5 border border-black dark:border-none" />
              <button type="submit" className="p-2 bg-oranj">Submit</button>
            </Form>
        </div>
        <div className="bg-seashell dark:bg-greey w-full">{children}</div>
      </div> 
      {/* <div className="flex bg-[#f1f1f1] flex-nowrap overflow-hidden">
        <div className="h-[65vh] w-full flex items-center justify-center transition-all">

        </div>
        <div className="h-[65vh] w-full flex items-center justify-center transition-all">

        </div>
        <div className="h-[65vh] w-full flex items-center justify-center transition-all">

        </div> 
      </div> */}
    </>

  );
};

export default HomeLayout;
