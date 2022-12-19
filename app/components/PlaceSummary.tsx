import React from 'react';
import type Place from '@prisma/client';
import { IoIosThumbsUp, IoIosThumbsDown } from 'react-icons/io';
import { GoLocation } from 'react-icons/go';

type Props = {
  place: Place;
}

const PlaceSummary: React.FC<Props> = ({ place }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-full">
      <img src={place.coverImage} alt={place.name} className="w-full h-64 rounded-t-lg object-cover" />
      <div className="pt-4 pb-2 text-xl font-bold text-center">{place.name}</div>
      <div className="flex items-center justify-around text-gray-600 text-center text-sm"><GoLocation size={15} className="mr-1" /> {place.city}, {place.country}</div>
      <div className="text-gray-600 text-center text-sm">Visitors: {place.visitor.length}</div>
      <div className="text-gray-600 text-center text-sm">Overall Rating: {place.overallRating}</div>
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center">
         
          <IoIosThumbsUp className="text-green-500" />
          <span className="mr-2 text-xl text-green-500">{place.upvotes}</span>
        </div>
        <div className="flex items-center">
          
          <IoIosThumbsDown className="text-red-500" />
          <span className="mr-2 text-xl text-red-500">{place.downvotes}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceSummary;
