import { Place } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PlaceSummary from "./PlaceSummary";

type CarouselProps = {
  items: Place[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    setSlideWidth(document.querySelector("slide")?.clientWidth || 0);
  }, []);

  const handleNext = () => {
    if (activeIndex === items.length - 1) {
      setActiveIndex(0);
      setTranslateValue(0);
    } else {
      setActiveIndex(activeIndex + 1);
      setTranslateValue(translateValue - slideWidth);
    }
  };
  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(items.length - 1);
      setTranslateValue(-slideWidth * (items.length - 1));
    } else {
      setActiveIndex(activeIndex - 1);
      setTranslateValue(translateValue + slideWidth);
    }
  };

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex items-center"
        style={{
          transform: `translateX(${translateValue}px)`,
          transition: "transform ease-out 0.45s",
        }}
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-auto"
              style={{
                width: `${slideWidth}px`,
              }}
            >
              <PlaceSummary place={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
