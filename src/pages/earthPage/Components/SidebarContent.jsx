// src/Pages/EarthPage/Components/SidebarContent.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function SidebarContent({ selectedCountry, date }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCountry || !date) return;

    const fetchCountryEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const isoDate = new Date(date).toISOString();

        const response = await fetch(
          `
          ${baseURL}/api/events/by-date?country=${encodeURIComponent(
            selectedCountry
          )}&date=${encodeURIComponent(isoDate)}`
        );

        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();

        const formatted = data.map((event) => ({
          id: event._id, // <-- include the DB id
          eventName:
            event.coreInfo?.eventName || event.title || "Untitled Event",
          startingDate: event.coreInfo?.startingDate
            ? new Date(event.coreInfo.startingDate).toLocaleDateString("en-GB")
            : "N/A",
          endingDate: event.coreInfo?.endDate
            ? new Date(event.coreInfo.endDate).toLocaleDateString("en-GB")
            : "N/A",
          eventDescription:
            event.summary?.length > 150
              ? event.summary.slice(0, 150) + "..."
              : event.summary || "No summary available.",
          eventTags: event.coreInfo?.eventTags || [],
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryEvents();
  }, [selectedCountry, date]);

  const handleEventClick = (event) => {
    navigate(`/event/${encodeURIComponent(event.id)}`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="alert alert-error">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-base-300">
        <h2 className="text-2xl font-bold text-primary">{selectedCountry}</h2>
        <p className="text-sm text-base-content/70 mt-1">
          Historical events on {date?.toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!events.length ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">
              No Events Found
            </h3>
            <p className="text-base-content/70">
              No historical events found on this date for {selectedCountry}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={event.id || index}
                className="card bg-base-200 hover:bg-base-300 transition-colors duration-200 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="card-body p-4">
                  <h3 className="card-title text-lg text-primary hover:text-primary-focus">
                    {event.eventName}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-secondary mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {event.startingDate} – {event.endingDate}
                    </span>
                  </div>

                  <p className="text-base-content/80 text-sm leading-relaxed mb-3">
                    {event.eventDescription}
                  </p>

                  {event.eventTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {event.eventTags.slice(0, 4).map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="badge badge-primary badge-sm"
                        >
                          {tag}
                        </div>
                      ))}
                      {event.eventTags.length > 4 && (
                        <div className="badge badge-ghost badge-sm">
                          +{event.eventTags.length - 4} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
