import type { Place } from "@prisma/client";

type Props = {
  place: Place;
};

const HomePlace = ({ place }: Props) => {
  return (
    <div className="flex items-center justify-around p-3 w-full shadow-md my-2 rounded-md h-[300px]">
      <div className="w-[30%] h-full">
        <div
          style={{
            backgroundImage: `url(${place.coverImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={`w-full h-full rounded-md flex items-end justify-end`}
        >
          <span>{place.category}</span>
        </div>
      </div>
      <div className="w-[35%] h-full flex flex-col items-start justify-around">
        <h3 className="text-center w-full">{place.name}</h3>
        <div className="mt-2">
          <p>Affordability: {place.costRating}</p>
          <p>Safety: {place.safetyRating}</p>
          <p>Accessibility: {place.accessibilityRating}</p>
          <p>Overall: {place.overallRating}</p>
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
  );
};

export default HomePlace;
