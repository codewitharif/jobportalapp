import React, { useContext, useRef } from "react";
import { assets } from "../src/assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { SetSearchFilter, SetIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    SetSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    SetIsSearched(true);
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
  };
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10000+ Jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Find jobs by title or location and apply now.
        </p>

        {/* 🔧 Updated search bar container */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 bg-white rounded text-gray-600 max-w-3xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 flex-1">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="Search" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-xs sm:text-sm p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <img
              className="h-4 sm:h-5"
              src={assets.location_icon}
              alt="Location"
            />
            <input
              type="text"
              placeholder="Location"
              className="text-xs sm:text-sm p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>

          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white"
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-200 shadow-sm rounded-lg mx-auto mt-8 p-6 max-w-7xl">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <img
            className="h-6 opacity-80 hover:opacity-100 transition-opacity"
            src={assets.microsoft_logo}
            alt="Microsoft"
          />
          <img
            className="h-6 opacity-80 hover:opacity-100 transition-opacity"
            src={assets.walmart_logo}
            alt="Walmart"
          />
          <img
            className="h-6 opacity-80 hover:opacity-100 transition-opacity"
            src={assets.accenture_logo}
            alt="Accenture"
          />
          <img
            className="h-6 opacity-80 hover:opacity-100 transition-opacity"
            src={assets.samsung_logo}
            alt="Samsung"
          />
          <img
            className="h-8 opacity-80 hover:opacity-100 transition-opacity"
            src={assets.amazon_logo}
            alt="Amazon"
          />
          <img
            className="h-7 opacity-80 hover:opacity-100 transition-opacity"
            src={assets.adobe_logo}
            alt="Adobe"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
