import ButtonAsLink from "./ButtonAsLink";

type Props = {};

const ContributeBannerBox = (props: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-between bg-white text-black shadow-md rounded-md shadow-black h-1/4 w-1/2 md:w-1/4 p-1 md:p-2 right-10 bottom-10">
      <p className="text-center p-1 lg:p-6">
        Add to our ever-growing list of amazing destinations.
      </p>
      <div className="text-left">
        <ButtonAsLink to="/new">Join</ButtonAsLink>
      </div>
    </div>
  );
};

export default ContributeBannerBox;
