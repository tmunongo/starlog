import { motion } from "framer-motion";
import { NavMenuItem } from "./NavMenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const NavMenu = () => (
  <motion.ul
    variants={variants}
    id="navBackground"
    className="flex flex-col items-start justify-around bg-mintgreen"
  >
    {navItems.map((item, index) => (
      <NavMenuItem key={index} elem={item} />
    ))}
  </motion.ul>
);

const navItems = [
  {
    content: "Home",
    location: "/",
    icon: "<MdPerson size={25} />",
  },
  {
    content: "Profile",
    location: "/profile",
    icon: "<MdPerson size={25} />",
  },
  {
    content: "New",
    location: "/places/new",
    icon: "<MdPerson size={25} />",
  },
  {
    content: "My Places",
    location: "/myplaces",
    icon: "<MdPerson size={25} />",
  },
  {
    content: "My Bucket List",
    location: "/bucket-list",
    icon: "<MdPerson size={25} />",
  },
];
