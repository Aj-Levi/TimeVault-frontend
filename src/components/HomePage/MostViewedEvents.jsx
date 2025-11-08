import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCard from "../EventCard";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const images = ["/sample1.jpg","/sample2.jpg","/sample3.jpg","/sample4.jpg"];

const MostViewedEvents = ({ title = "Most Viewed Events" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseURL}/api/events/featuredEvents`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching featured events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: () => (
      <div
        className="w-3 h-3 mx-1 rounded-full bg-base-300 hover:bg-primary transition-colors duration-300"
        style={{
          opacity: 0.7,
        }}
      />
    ),
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          {title}
        </h2>
        <div className="alert alert-neutral flex justify-center gap-x-4 shadow-lg max-w-3xl mx-auto">
          <span className="loading loading-spinner loading-md text-primary"></span>
          <span className="text-lg font-semibold text-primary">
            Loading Featured Events...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          {title}
        </h2>
        <div className="alert alert-error flex justify-center gap-x-4 shadow-lg max-w-3xl mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold text-lg">Error loading events!</h3>
            <div className="text-md font-normal">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          {title}
        </h2>
        <div className="alert alert-warning flex justify-center gap-x-4 shadow-lg max-w-3xl mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span className="text-lg font-semibold">
            No featured events available at the moment.
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="featured" className="w-full py-8">
        <h2 className="text-2xl text-primary underline underline-offset-8 decoration-base-content md:text-3xl font-bold mb-12 text-center">
          {title}
        </h2>

        <div className="slider-container px-4 relative">
          <Slider {...settings}>
            {data.map((event,index) => (
              <div key={String(event._id)} className="px-4">
                <EventCard
                  eventName={event.coreInfo.eventName}
                  description={event.subtitle}
                  country={event.coreInfo.country || "Global"}
                  startDate={event.coreInfo.startingDate}
                  endDate={event.coreInfo.endDate}
                  tags={event.coreInfo.eventTags}
                  image={images[index%4]}
                />
              </div>
            ))}
          </Slider>
        </div>

        <style jsx global>{`
          .slick-track {
            display: flex !important;
          }
          .slick-slide {
            height: inherit !important;
            display: flex !important;
          }
          .slick-slide > div {
            display: flex;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
      {/* Bottom CTA Section */}
        <div className="text-center mt-4 mb-12 mx-16">
          <div className="bg-linear-to-r from-primary to-secondary p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Want to Contribute?
            </h3>
            <p className="text-black font-bold mb-6 max-w-2xl mx-auto">
              Share your knowledge related to a particular event with millions of people across the globe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-accent btn-lg">Contribute</button>
            </div>
          </div>
        </div>
    </>
  );
};

export default MostViewedEvents;
