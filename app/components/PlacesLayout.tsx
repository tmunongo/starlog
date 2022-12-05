import { Form, useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ReactElement } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { MdClose, MdMenu } from "react-icons/md";
import { getUser } from "~/utils/login.server";
import ButtonAsLink from "./ButtonAsLink";
import LinkButtonElement from "./LinkButtonElement";
import { NavMenu } from "./NavMenu";

type Props = {
  children: ReactElement;
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

const PlacesLayout = ({ children }: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className="bg-babypowder">
      <div className="h-20">
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
            <ButtonAsLink to="/login">Not Logged In</ButtonAsLink>
          )}
        </div>
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
      <div className="min-h-screen w-full mt-6">{children}</div>
    </div>
  );
};

export default PlacesLayout;
