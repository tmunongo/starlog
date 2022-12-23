import { Link } from "@remix-run/react";

type Props = {
  children: string;
  to: string;
};

const ButtonAsLink = ({ children, to }: Props) => {
  return (
    <Link to={`${to}`}>
      <div className="bg-highlights_light dark:bg-highlights_dark p-1 md:p-2 px-3 md:px-6 border border-highlights_light dark:border-highlights_dark text-text_dark_primary dark:text-text_light_secondary rounded-md text-center ">
        {children}
      </div>
    </Link>
  );
};

export default ButtonAsLink;
