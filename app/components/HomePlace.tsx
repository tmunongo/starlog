import type { Place } from "@prisma/client";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdMuseum,
  MdPark,
} from "react-icons/md";
import { calcOverall } from "~/utils/calcOverall";
import { generateScoreVisual } from "~/utils/generateScoreBars";
import ButtonAsLink from "./ButtonAsLink";

type Props = {
  place: Place;
};

const HomePlace = ({ place }: Props) => {
  const renderIcon = (cat: string) => {
    switch (cat) {
      case "Museum": {
        return <MdMuseum size={20} />;
      }
      case "Historical Site": {
        return <MdPark size={20} />;
      }
    }
  };

  return (
    <>
      {/* mobile version place item */}
      <div
        id="mobile-version"
        className="sm:hidden w-full h-[250px] overflow-hidden flex flex-col items-center justify-start border-2 border-black p-1 rounded-md my-2"
      >
        <div className="w-full h-full">
          <div
            style={{
              backgroundImage: `url(${place.coverImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className={`w-full h-full rounded-md flex items-end justify-end bottom-0 hover:-top-full brightness-50`}
          >
            <span className="p-2 bg-gray-300 hover:bg-gray-400 rounded-md m-5 transition-all duration-500 z-10">
              {renderIcon(place.category)}
            </span>
          </div>
        </div>
        <div className="w-4/5 h-1/4 m-3 absolute font-bold bg-gray-200 opacity-60 rounded-md p-4">
          <h3 className="text-center w-full grid place-items-center">
            {place.name}
          </h3>
          <div className="mt-2">
            <div className="mt-2 w-full flex flex-col items-start justify-start">
              <div className="flex items-center justify-start w-full">
                <div className="w-1/2">
                  <p>Affordability: </p>
                </div>
                <div className="w-1/2">
                  <p>{place.costRating}</p>
                </div>
              </div>
              <div className="flex items-center justify-around w-full">
                <div className="w-1/2">
                  <p>Safety: </p>
                </div>
                <div className="w-1/2">
                  <p>{generateScoreVisual(place.safetyRating)}</p>
                </div>
              </div>
              <div className="flex items-center justify-around w-full">
                <div className="w-1/2">
                  <p>Accessibility: </p>
                </div>
                <div className="w-1/2">
                  <p>{generateScoreVisual(place.accessibilityRating)}</p>
                </div>
              </div>
              <div className="flex items-center justify-around w-full">
                <div className="w-1/2">
                  <p>Overall: </p>
                </div>
                <div className="w-1/2">
                  <p>
                    {generateScoreVisual(
                      calcOverall(
                        place.upvotes,
                        place.downvotes,
                        place.costRating,
                        place.safetyRating,
                        place.accessibilityRating
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <ButtonAsLink to={place.id}>Details</ButtonAsLink>
            </div>
          </div>
        </div>
      </div>
      {/* Large screen version */}
      <div className="hidden sm:flex items-center justify-around p-3 w-full shadow-md my-2 rounded-md h-[300px]">
        <div className="w-[30%] h-full">
          <div
            style={{
              backgroundImage: `url(${place.coverImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className={`w-full h-full rounded-md flex items-end justify-end`}
          >
            <span className="p-2 bg-gray-300 hover:bg-gray-400 rounded-md m-2 transition-all duration-500">
              {renderIcon(place.category)}
            </span>
          </div>
        </div>
        <div className="w-[35%] h-full flex flex-col items-start justify-around ">
          <div>
            <h3 className="text-center w-full">{place.name}</h3>
          </div>
          <div className="mt-2 w-full flex flex-col items-start justify-start">
            <div className="flex items-center justify-start w-full">
              <div className="w-1/2">
                <p>Affordability: </p>
              </div>
              <div className="w-1/2">
                <p>{place.costRating}</p>
              </div>
            </div>
            <div className="flex items-center justify-around w-full">
              <div className="w-1/2">
                <p>Safety: </p>
              </div>
              <div className="w-1/2">
                <p>{generateScoreVisual(place.safetyRating)}</p>
              </div>
            </div>
            <div className="flex items-center justify-around w-full">
              <div className="w-1/2">
                <p>Accessibility: </p>
              </div>
              <div className="w-1/2">
                <p>{generateScoreVisual(place.accessibilityRating)}</p>
              </div>
            </div>
            <div className="flex items-center justify-around w-full">
              <div className="w-1/2">
                <p>Overall: </p>
              </div>
              <div className="w-1/2">
                <p>
                  {generateScoreVisual(
                    calcOverall(
                      place.upvotes,
                      place.downvotes,
                      place.costRating,
                      place.safetyRating,
                      place.accessibilityRating
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <ButtonAsLink to={`places/${place.id}`}>Details</ButtonAsLink>
            </div>
            <div className="flex items-center justify-center">
              <span className="flex items-center justify-center">
                <MdArrowUpward size={25} color="green" />
                <span>{place.upvotes}</span>
              </span>
              <span className="flex items-center justify-center">
                <MdArrowDownward size={25} color="red" />
                <span>{place.downvotes}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-around w-[28%] h-full">
          <div className="h-full w-full overflow-hidden rounded-md flex flex-col items-start justify-around">
            <img
              src="https://res.cloudinary.com/ta1da-cloud/image/upload/v1669900808/seven-wonders/map-of-africa_riab3r.jpg"
              alt="location"
              className="rounded-md hover:scale-110 transition-all duration-500 border-black my-1"
            />
          </div>
          <div className="text-center w-full my-1">
            <span className="bg-[#BBDEF0] p-1 rounded-md text-sm">
              {place.city}, {place.country}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePlace;
