import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({
  eventName = "World War II",
  description = "A global conflict that lasted from 1939 to 1945, involving most of the world's nations and resulting in significant changes to the global political landscape.",
  country = "Global",
  startDate = "1939-09-01",
  endDate = "1945-09-02",
  image,
  tags = ["War", "Global Conflict", "20th Century", "Politics", "Military"],
  id,
}) => {
  // Format dates for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate duration
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${
        months > 0 ? `${months} month${months > 1 ? "s" : ""}` : ""
      }`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="card bg-base-200 border shadow-xl hover:shadow-2xl hover:scale-103 transition duration-300 max-w-md h-full">
      <div className="card-body flex flex-col justify-between h-full">
        <div className="grow">
          {/* Event Image */}
          {image && (
            <div className="mb-4">
              <img
                src={image}
                alt={`${eventName} - Historical Event`}
                className="w-full h-60 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Event Title */}
          <div className="flex justify-between mb-2">
            <h2 className="card-title text-primary font-bold text-xl leading-tight">
              {eventName}
            </h2>
            <div className="badge badge-secondary badge-outline ml-2 shrink-0">
              {country}
            </div>
          </div>

          {/* Description */}
          <p className="text-base-content leading-relaxed mb-4 text-sm line-clamp-3">
            {description}
          </p>

          {/* Date Information */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-secondary">
                Start:
              </span>
              <span className="text-xs">{formatDate(startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-secondary">End:</span>
              <span className="text-xs">{formatDate(endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-secondary">
                Duration:
              </span>
              <span className="text-xs text-base-content">
                {calculateDuration(startDate, endDate)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 5).map((tag, index) => (
                <div key={index} className="badge badge-primary badge-xs">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="card-actions justify-center mt-auto pt-4">
          <Link to={`/event/${id}`} className="w-full">
            <button className="btn btn-secondary w-full">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
