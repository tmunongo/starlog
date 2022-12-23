import { Link } from "@remix-run/react";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  to: string;
};

const LinkButtonElement = ({ children, to }: Props) => {
  return (
    <div className="text-text_dark_primary dark:text-bg_dark_primary bg-highlights_light dark:bg-highlights_dark p-1 md:p-2 px-3 md:px-6 rounded-md border border-highlights_light dark:border-highlights_dark">
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default LinkButtonElement;
