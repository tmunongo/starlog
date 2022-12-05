import { motion } from "framer-motion";
import { navItems } from "~/data/navigation";
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

export const NavMenu = () => (
  <motion.div
    id="nav-container"
    initial={closed}
    animate="open"
    exit="closed"
    variants={sideVariants}
  >
    <motion.ul
    // variants={variants}
    // className="flex flex-col items-start justify-around bg-mintgreen"
    >
      {navItems.map((item, index) => (
        <NavMenuItem key={index} elem={item} />
      ))}
    </motion.ul>
  </motion.div>
);
