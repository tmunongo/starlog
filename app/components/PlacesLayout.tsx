import type { ActionFunction } from "@remix-run/node";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import type { ReactElement } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { logout } from "~/utils/login.server";
// import { getUser } from "~/utils/login.server";
import Footer from "./Footer";
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
    <div className="max-w-screen">
      <div className="bg-bg_light_primary dark:bg-bg_dark_primary w-screen">
        {/* #353e46 */}
        <div className="h-[80px] bg-light_secondary dark:bg-bg_dark_secondary">
          <div className="absolute left-16 md:left-20 top-3 md:top-4 bg-highlights_light dark:bg-highlights_dark rounded-lg flex items-center p-2 md:px-3">
            <img
              className="h-6 md:h-8 w-auto md:mr-3 rounded-md"
              src="https://res.cloudinary.com/ta1da-cloud/image/upload/v1671442731/seven-wonders/trouvaille1_vrghpe.png"
              alt="logo"
            />
            <a href="/">
              <span className="hidden md:flex font-montserrat md:text-xl text-text_dark_primary dark:text-text_light_primary px-2">
                trouvaille
              </span>
            </a>
          </div>
          <UserInfo />
          {/* Side menu toggle button */}
          <div className="absolute top-3 md:top-4 left-2 md:left-4 rounded-full z-50">
            <button onClick={toggleOpen} className="p-2 md:p-3">
              {isOpen ? (
                <MdClose size={25} color={"#fe772b"} />
              ) : (
                <MdMenu size={25} color={"#fe772b"} />
              )}
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
        <div className="min-h-screen w-full dark:text-white">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default PlacesLayout;
