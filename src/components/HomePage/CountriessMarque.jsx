import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  { id: 1, name: "Nike", logo: "/HomeFavicon.png" },
  { id: 2, name: "Adidas", logo: "/HomeFavicon.png" },
  { id: 3, name: "Gucci", logo: "/HomeFavicon.png" },
  { id: 4, name: "Prada", logo: "/HomeFavicon.png" },
  { id: 6, name: "Zara", logo: "/HomeFavicon.png" },
  { id: 7, name: "H&M", logo: "/HomeFavicon.png" },
];

const BrandsMarque = ({ title = "Expore by Countries" }) => {
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <section className="py-8 bg-base-200">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-12 underline underline-offset-8 decoration-base-content text-primary text-center">{title}</h2>
      )}
      
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {[...brands, ...brands].map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="px-4">
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-xl mb-3 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-cover p-1 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium opacity-80 group-hover:opacity-100">{brand.name}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BrandsMarque;
