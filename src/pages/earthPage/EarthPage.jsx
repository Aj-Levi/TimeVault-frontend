import {
  useState,
  useEffect,
  Suspense,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";

import { DateSelector } from "./Components/DateSelector";
import { Earth } from "./Components/Earth";
import { Sidebar } from "./Components/Sidebar";

import { months } from "./Helpers/months";

export const selectedCountryContext = createContext();

export function EarthPage() {
  const [date, setDate] = useState(new Date());
  const [hasRotated, setHasRotated] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedCountryContextValue = useMemo(() => {
    return { selectedCountry, setSelectedCountry };
  }, [selectedCountry]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Trigger animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Function to open the sidebar
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  function onDateChange(newDate) {
    setDate(newDate);
  }

  function handleRotation() {
    if (!hasRotated) {
      setHasRotated(true);
    }
  }

  const selectedMonth = months[date.getMonth() + 1];

  useEffect(() => {
    if (selectedCountry !== null) {
      console.log(date);
      openSidebar();
    }
  }, [selectedCountry]);

  // this type of preloading is not enough remember to make 12 diff useTexture objects in the memory in Model.jsx also use a useMemo and remove this part here
  useEffect(() => {
    const textureUrls = Object.values(months).map(
      (month) => `./textures/earth-${month}.jpg`
    );
    useTexture.preload(textureUrls);
  }, []);

  const handleEventClick = (event) => {
    console.log("Loading event page for:", event.eventName);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Globe Section with Floating Instructions */}
      <div className="relative w-full h-screen flex bg-gray-900 overflow-hidden">
        {/* Floating Instructions */}
        {/* Step 1 - Top Left */}
        <div
          className={`absolute top-20 left-8 z-30 bg-base-100/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-primary/20 max-w-xs transition-all duration-1000 ease-out ${
            isLoaded
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base-content">Click on a Country</h3>
          </div>
          <p className="text-sm text-base-content/70">
            Rotate and zoom the globe, then click on any country to explore its
            historical events.
          </p>
        </div>

        {/* Step 2 - Top Right */}
        <div
          className={`absolute top-20 right-8 z-30 bg-base-100/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-secondary/20 max-w-xs transition-all duration-1000 ease-out delay-200 ${
            isLoaded
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-secondary text-secondary-content rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base-content">Select Date</h3>
          </div>
          <p className="text-sm text-base-content/70">
            Use the date selector above to choose when in history you want to
            explore.
          </p>
        </div>

        {/* Step 3 - Bottom Left */}
        <div
          className={`absolute bottom-24 left-8 z-30 bg-base-100/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-accent/20 max-w-xs transition-all duration-1000 ease-out delay-400 ${
            isLoaded
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-accent text-accent-content rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base-content">Explore Events</h3>
          </div>
          <p className="text-sm text-base-content/70">
            Browse historical events that occurred in your selected country and
            time period.
          </p>
        </div>

        {/* DateSelector - Bottom Right */}
        <div
          className={`absolute bottom-24 right-8 z-30 transition-all duration-1000 ease-out delay-600 ${
            isLoaded
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <DateSelector onDateChange={onDateChange} />
        </div>

        {/* Title Badge - Top Center */}
        <div
          className={`absolute top-8 left-1/2 transform -translate-x-1/2 z-30 bg-base-100/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-base-300 transition-all duration-1000 ease-out delay-800 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold text-base-content">
              Globe Explorer
            </h1>
          </div>
        </div>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 1000 }}
          className="flex-1 w-full h-full"
        >
          <ambientLight intensity={2} />
          <directionalLight
            color="white"
            position={[5, 5, 5]}
            intensity={1.5}
          />

          <Stars
            radius={100} // Radius of the sphere
            depth={50} // Depth of the stars
            count={1000} // Number of stars
            factor={4} // Star size factor
            saturation={0.9} // Saturation 0 is white
            fade // Stars fade out at the edges
            speed={1} // Animation speed
          />

          <Suspense fallback={null}>
            <selectedCountryContext.Provider
              value={selectedCountryContextValue}
            >
              <Earth
                selectedMonth={selectedMonth}
                hasRotated={hasRotated}
                openSidebar={openSidebar}
              />
            </selectedCountryContext.Provider>
          </Suspense>
          <OrbitControls
            minDistance={4}
            maxDistance={12}
            onStart={hasRotated ? null : handleRotation}
          />
        </Canvas>

        <Sidebar
          selectedCountry={selectedCountry}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onEventClick={handleEventClick}
          date={date}
        />
      </div>
    </div>
  );
}
