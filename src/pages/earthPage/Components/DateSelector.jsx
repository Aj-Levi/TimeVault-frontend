//components/.DateSelector.jsx

import React, { useState, useEffect } from "react";

function AlertMessage({ message }) {
  if (!message) return null;
  return (
    <div className="alert alert-warning absolute top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm shadow-xl">
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
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

export function DateSelector({ onDateChange }) {
  const today = new Date();
  const MIN_YEAR = 1900;
  const MAX_YEAR = today.getFullYear();

  const [year, setYear] = useState(MAX_YEAR);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const reportDateChange = (d, m, y) => {
    const daysInMonth = new Date(y, m, 0).getDate();
    const validDay = Math.min(d, daysInMonth);
    const newDate = new Date(y, m - 1, validDay);
    if (!isNaN(newDate) && onDateChange) {
      onDateChange(newDate);
    }

    if (d !== validDay) {
      setDay(validDay);
    }
  };

  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleDayChange = (e) => setDay(e.target.value);

  const handleYearBlur = (e) => {
    let newYear = parseInt(e.target.value, 10);
    if (isNaN(newYear) || newYear < MIN_YEAR) {
      newYear = MIN_YEAR;
      setAlert(`Year must be after ${MIN_YEAR}. Setting to ${MIN_YEAR}.`);
    } else if (newYear > MAX_YEAR) {
      newYear = MAX_YEAR;
      setAlert(`Year cannot be in the future. Setting to ${MAX_YEAR}.`);
    }
    setYear(newYear);
    reportDateChange(day, month, newYear);
  };

  const handleMonthBlur = (e) => {
    let newMonth = parseInt(e.target.value, 10);
    if (isNaN(newMonth) || newMonth < 1) newMonth = 1;
    else if (newMonth > 12) newMonth = 12;
    setMonth(newMonth);
    reportDateChange(day, newMonth, year);
  };

  const handleDayBlur = (e) => {
    let newDay = parseInt(e.target.value, 10);
    const daysInMonth = new Date(year, month, 0).getDate();
    if (isNaN(newDay) || newDay < 1) newDay = 1;
    else if (newDay > daysInMonth) newDay = daysInMonth;
    setDay(newDay);
    reportDateChange(newDay, month, year);
  };

  return (
    <>
      <div className="bg-base-100/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-base-300 w-80">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 px-6 py-3 border-b border-base-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
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
          <h3 className="text-lg font-bold text-base-content">
            Select Historical Date
          </h3>
        </div>

        {/* Date Inputs */}
        <div className="p-4">
          <div className="flex gap-2 items-end">
            <div className="form-control flex-1">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-primary">
                  Day
                </span>
              </label>
              <input
                type="number"
                value={day}
                onChange={handleDayChange}
                onBlur={handleDayBlur}
                min="1"
                max="31"
                className="input input-bordered input-sm w-full text-center font-bold focus:input-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="DD"
              />
            </div>

            <div className="form-control flex-1">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-primary">
                  Month
                </span>
              </label>
              <input
                type="number"
                value={month}
                onChange={handleMonthChange}
                onBlur={handleMonthBlur}
                min="1"
                max="12"
                className="input input-bordered input-sm w-full text-center font-bold focus:input-secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="MM"
              />
            </div>

            <div className="form-control flex-1">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-primary">
                  Year
                </span>
              </label>
              <input
                type="number"
                value={year}
                onChange={handleYearChange}
                onBlur={handleYearBlur}
                min={MIN_YEAR}
                max={MAX_YEAR}
                className="input input-bordered input-sm w-full text-center font-bold focus:input-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="YYYY"
              />
            </div>
          </div>

          {/* Current Date Display */}
          <div className="mt-3 p-2 bg-base-200 rounded-lg text-center">
            <span className="text-xs text-base-content/70">
              Selected Date:{" "}
            </span>
            <span className="text-sm font-bold text-base-content">
              {new Date(year, month - 1, day).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <AlertMessage message={alert} />
    </>
  );
}
