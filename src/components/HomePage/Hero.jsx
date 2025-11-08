import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CountUpItem from "./CountUpItem";

const HeroSection = () => {
    return (
        <div className="w-full bg-gradient-to-br from-base-100 to-base-300">
            <div className="container mx-auto py-16 px-4 flex flex-col-reverse md:flex-row items-center gap-x-24 gap-y-12">
                <div className="w-full md:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Discover Fashion
                            </span>{" "}
                            That Defines You
                        </h1>
                        <p className="text-lg text-gray-500 max-w-md">
                            Explore our curated collection of premium clothing designed to
                            elevate your style and express your unique personality.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link to="#featured" className="group">
                            <button className="btn btn-primary px-8 py-3 flex items-center gap-2 transition-all duration-600 hover:shadow-lg hover:bg-primary">
                                Shop Now
                                <FaLongArrowAltRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </button>
                        </Link>
                        <Link to="/categories" className="group">
                            <button className="btn btn-outline px-8 py-3">
                                View Collections
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                        <CountUpItem endValue={200} title="International Brands" />
                        <CountUpItem endValue={10000} title="Quality Products" />
                        <CountUpItem endValue={70000} title="Happy Customers" />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <div className="h-[500px]">
                            <img
                                src="/HomeFavicon.png"
                                alt="Hero-image"
                                className="object-cover w-full h-[500px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
