import { Link } from "@remix-run/react";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  to: string;
};

const LinkButtonElement = ({ children, to }: Props) => {
  return (
    <div className="bg-greeny dark:bg-oranj p-1 md:p-2 px-3 md:px-6 rounded-md border border-greeny dark:border-oranj">
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default LinkButtonElement;
