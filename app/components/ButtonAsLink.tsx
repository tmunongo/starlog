import { Link } from "@remix-run/react";

type Props = {
  children: string;
  to: string;
};

const ButtonAsLink = ({ children, to }: Props) => {
  return (
    <Link to={`${to}`}>
      <div className="bg-myr p-1 md:p-2 px-3 md:px-6 rounded-md border text-center ">
        {children}
      </div>
    </Link>
  );
};

export default ButtonAsLink;
