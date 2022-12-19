import type { ActionFunction } from "@remix-run/node";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import type { ReactElement } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { logout } from "~/utils/login.server";
// import { getUser } from "~/utils/login.server";
import { NavMenu } from "./NavMenu";
import UserInfo from "./UserInfo";

type Props = {
  children: ReactElement;
};

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

const PlacesLayout = ({ children }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className="bg-white dark:bg-greey">
   {/* #353e46 */} 
      <div className="h-[80px] bg-[#1c2541] dark:bg-[#353e46]">
        <div className="absolute left-20 top-3 md:top-4 bg-greeny dark:bg-oranj rounded-lg flex items-center p-2 px-3">
        <img className="h-8 w-auto md:mr-3 rounded-md" src="https://res.cloudinary.com/ta1da-cloud/image/upload/v1671442225/seven-wonders/trouvaille1_vrghpe.png" alt="logo" />
        <a href="/">
            <span className="font-montserrat md:text-xl">trouvaille</span>
          </a>
        </div>
        <UserInfo />
        {/* Side menu toggle button */}
        <div className=" absolute top-3 md:top-4 left-2 md:left-4 rounded-full z-50">
          <button onClick={toggleOpen} className="p-2 md:p-3">
            {isOpen ? <MdClose size={25} color={"#fe772b"} /> : <MdMenu size={25} color={"#fe772b"} />}
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
      </div>
      <div className="min-h-screen w-full dark:text-white">
        <div className="h-6 bg-[#C7DBE6] dark:bg-[#D3D0CB]"></div>
        {children}
      </div>
    </div>
  );
};

export default PlacesLayout;
