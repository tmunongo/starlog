import type { ActionFunction } from "@remix-run/node";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ReactElement } from "react";
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
    <div className="bg-babypowder">
      <div className="h-20 bg-[#1C2541]">
        <UserInfo />
        {/* Side menu toggle button */}
        <div className=" absolute top-2 left-2 md:left-4 bg-myr rounded-full z-50">
          <button onClick={toggleOpen} className="p-2 md:p-4">
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
      </div>
      <div className="min-h-screen w-full">
        <div className="h-6 bg-[#1C2541]"></div>
        {children}
      </div>
    </div>
  );
};

export default PlacesLayout;
