import React from "react";
import { SidebarContent } from "./SidebarContent";

export function Sidebar({
  onEventClick,
  isOpen,
  onClose,
  selectedCountry,
  date,
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-400 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-96 h-full bg-base-100 shadow-2xl z-50 flex flex-col border-l-2 border-base-300 transition-transform duration-600 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SidebarContent
          selectedCountry={selectedCountry}
          onEventClick={onEventClick}
          date={date}
        />
      </aside>
    </>
  );
}
