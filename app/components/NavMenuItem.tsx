import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

type Props = {
  elem: {
    content: string;
    location: string;
    id: number;
  };
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const NavMenuItem = ({ elem }: Props) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg m-2">
        <Link to={elem.location}>{elem.content}</Link>
      </span>
    </motion.li>
  );
};
