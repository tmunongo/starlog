import ButtonAsLink from "./ButtonAsLink";

type Props = {};

const JoinBannerBox = (props: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-between bg-white text-black shadow-md rounded-md shadow-black h-1/4 w-1/2 md:w-1/4 p-1 md:p-2 right-10 bottom-10">
      <p className="text-center p-1 lg:p-6 text-sm md:text-base">
        Join our community of contributors and put your favorite places on the
        map.
      </p>
      <div className="text-left">
        <ButtonAsLink to="/join">Join</ButtonAsLink>
      </div>
    </div>
  );
};

export default JoinBannerBox;
