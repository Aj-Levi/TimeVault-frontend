import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CountUpItem from "./CountUpItem";

const scrollToFeatured = () => {
  const element = document.getElementById("featured");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-br from-base-100 to-base-300">
      <div className="container mx-auto py-16 px-4 flex flex-col-reverse md:flex-row items-center gap-x-24 gap-y-12">
        <div className="w-full md:w-1/2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Explore History
              </span>{" "}
              That Shaped The World
            </h1>
            <p className="text-lg text-gray-500 max-w-md">
              Journey through time with our comprehensive collection of
              historical events, from ancient civilizations to modern
              milestones.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              className="btn btn-primary px-8 py-3 flex items-center gap-2 transition-all duration-600 hover:shadow-lg hover:bg-primary"
              onClick={scrollToFeatured}
            >
              Explore Events
              <FaLongArrowAltRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <Link to="/globe" className="group">
              <button className="btn btn-outline px-8 py-3">
                Interactive Globe
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <CountUpItem endValue={200} title="Historical Events" />
            <CountUpItem endValue={195} title="Countries Covered" />
            <CountUpItem endValue={150} title="Years of History" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative rounded-3xl overflow-hidden border border-primary">
            <div className="h-[500px]">
              <video
                src="/HomeVideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
