import ButtonAsLink from "./ButtonAsLink";

type Props = {};

const Contribute = (props: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-between bg-white text-black shadow-md rounded-md shadow-black h-1/4 w-1/2 md:w-1/4 p-1 md:p-2 right-10 bottom-10">
      <p className="text-center p-1 lg:p-6">
        Share your favorite places with the community.
      </p>
      <div className="text-left">
        <ButtonAsLink to="/places/add">Add Place</ButtonAsLink>
      </div>
    </div>
  );
};

export default Contribute;
