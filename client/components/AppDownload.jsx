import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const AppDownload = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4 text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Download Our Mobile App</h2>
          <p className="text-lg mb-6">
            Get instant access to the latest jobs, apply on the go, and never
            miss an opportunity. Available on both iOS and Android.
          </p>

          <div className="flex gap-4 flex-wrap">
            {/* App Store Button */}
            <a
              href="#"
              className="bg-black px-5 py-3 rounded-lg flex items-center gap-3 hover:opacity-80 transition"
            >
              <FaApple className="text-2xl" />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="font-semibold text-sm">App Store</p>
              </div>
            </a>

            {/* Play Store Button */}
            <a
              href="#"
              className="bg-black px-5 py-3 rounded-lg flex items-center gap-3 hover:opacity-80 transition"
            >
              <FaGooglePlay className="text-2xl" />
              <div className="text-left">
                <p className="text-xs">Get it on</p>
                <p className="font-semibold text-sm">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Image or Mockup */}
        {/* <div className="flex-1 flex justify-center">
          <img
            src="https://i.ibb.co/ZVh01dm/app-mockup.png"
            alt="App Preview"
            className="w-64 md:w-80 lg:w-96 drop-shadow-lg"
          />
        </div> */}
      </div>
    </section>
  );
};

export default AppDownload;
