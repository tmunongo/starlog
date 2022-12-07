import { Place } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { getUser } from "~/utils/login.server";

type Props = {
  elem: {
    content: string;
    location: string;
    protected: boolean;
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

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  placeListItems: Place[];
};

export const NavMenuItem = ({ elem }: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg m-2">
        {data.user && elem.protected ? (
          <Link to={elem.location}>{elem.content}</Link>
        ) : (
          <Link to={elem.location}>{elem.content}</Link>
        )}
      </span>
    </motion.li>
  );
};
