import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../utils/use-dimensions";
import { BurgerMenu } from "./BurgerMenu";
import JoinBannerBox from "./JoinBannerBox";
import { NavMenu } from "./NavMenu";

type Props = {
  children: any;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const HomeLayout = ({ children }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <div className="flex flex-col items-center justify-start w-screen min-h-screen">
      {/* <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex items-end justify-end h-[75vh] w-full"> */}
      {/* <div className="absolute top-2 left-2 md:left-12 md:top-6 p-2 bg-gray-400 rounded-full"> */}
      {/* </div> */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div className="background" variants={sidebar} />
        <NavMenu />
        <BurgerMenu toggle={() => toggleOpen()} />
      </motion.nav>
      <div className="bg-hero-image bg-center bg-cover  text-white flex items-end justify-end h-[75vh] w-full">
        {/* add login check */}
        <JoinBannerBox />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
