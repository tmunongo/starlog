import JoinBannerBox from "./JoinBannerBox";

type Props = {
  children: any;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start w-screen min-h-screen">
      {/* <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex items-end justify-end h-[75vh] w-full"> */}
      <div className="bg-hero-image bg-center bg-cover  text-white flex items-end justify-end h-[75vh] w-full">
        <JoinBannerBox />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
