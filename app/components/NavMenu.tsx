import { motion } from "framer-motion";
import { GiSun, GiMoon } from "react-icons/gi";
import { navItems } from "~/data/navigation";
import { Theme, useTheme } from "~/utils/theme-provider";

import { NavMenuItem } from "./NavMenuItem";

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.2, delayChildren: 1 },
  },
  closed: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

export const NavMenu = () => {
  const [, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }

  return (
    <motion.div
      id="nav-container"
      initial={closed}
      animate="open"
      exit="closed"
      variants={sideVariants}
      className="flex flex-col items-center justify-start"
    >
      <motion.ul
      // variants={variants}
      // className="flex flex-col items-start justify-around bg-mintgreen"
      >
        {navItems.map((item, index) => (
          <NavMenuItem key={index} elem={item} />
        ))}
      </motion.ul>
      <div className="w-full flex items-center justify-center">
        <span className="p-1" onClick={() => toggleTheme()}>
          {/* {Theme.DARK ? */}
          <GiSun className="hidden dark:block" size={25} color={"yellow"} />
          <GiMoon className="block dark:hidden" size={25} color={"grey"} />
          {/* }   */}
        </span>
      </div>
    </motion.div>
  )
};
