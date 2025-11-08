import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Tag,
  X,
  Loader2,
  AlertCircle,
  Users,
  Clock,
} from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SearchPage = () => {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  // Available options from API
  const [availableTags, setAvailableTags] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);

  // Search results and loading states
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(true);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch available tags and countries on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setIsLoadingFilters(true);
      try {
        const [tagsResponse, countriesResponse] = await Promise.all([
          fetch(`${baseURL}/api/events/tags`),
          fetch(`${baseURL}/api/events/countries`),
        ]);

        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setAvailableTags(Array.isArray(tagsData) ? tagsData : []);
        }

        if (countriesResponse.ok) {
          const countriesData = await countriesResponse.json();
          setAvailableCountries(
            Array.isArray(countriesData) ? countriesData : []
          );
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      } finally {
        setIsLoadingFilters(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();

    // Check if at least one filter is provided
    if (
      !searchQuery &&
      selectedCountries.length === 0 &&
      selectedTags.length === 0 &&
      !startingDate &&
      !endingDate
    ) {
      setError("Please enter a search query or select at least one filter");
      return;
    }

    setIsSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchData = {
        query: searchQuery || undefined,
        countries: selectedCountries.length > 0 ? selectedCountries : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        startingDate: startingDate || undefined,
        endingDate: endingDate || undefined,
      };

      // Remove undefined values
      const cleanedSearchData = Object.fromEntries(
        Object.entries(searchData).filter(([_, value]) => value !== undefined)
      );

      const response = await fetch(`${baseURL}/api/events/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedSearchData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to search events`);
      }

      const results = await response.json();
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Search failed:", error);
      setError(error.message || "Failed to search events");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Helper functions for managing filters
  const addCountry = (country) => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const removeCountry = (country) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
  };

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCountries([]);
    setSelectedTags([]);
    setStartingDate("");
    setEndingDate("");
    setSearchResults([]);
    setHasSearched(false);
    setError(null);
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-base-300 py-12 px-4 mx-8 mt-8 rounded-3xl">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Search Historical Events
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover events by searching through our comprehensive database of
            historical moments
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="card bg-base-200 shadow-xl mb-8"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <Filter className="h-6 w-6" />
              Search & Filter Events
            </h2>

            {/* Search Query Input */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Query
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter keywords, event names, or descriptions..."
                className="input input-bordered w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Countries Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Countries
                  </span>
                </label>
                {isLoadingFilters ? (
                  <div className="skeleton h-12 w-full"></div>
                ) : (
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) => {
                      if (e.target.value) {
                        addCountry(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Select countries...</option>
                    {availableCountries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                )}
                {/* Selected Countries */}
                {selectedCountries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCountries.map((country, index) => (
                      <div key={index} className="badge badge-primary gap-2">
                        {country}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeCountry(country)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </span>
                </label>
                {isLoadingFilters ? (
                  <div className="skeleton h-12 w-full"></div>
                ) : (
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) => {
                      if (e.target.value) {
                        addTag(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Select tags...</option>
                    {availableTags.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                )}
                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tag, index) => (
                      <div key={index} className="badge badge-secondary gap-2">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={startingDate}
                  onChange={(e) => setStartingDate(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="alert alert-error mb-4">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <button
                type="button"
                onClick={clearAllFilters}
                className="btn btn-outline"
              >
                Clear All Filters
              </button>
              <button
                type="submit"
                disabled={isSearching}
                className="btn btn-primary gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search Events
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Search Results */}
        {hasSearched && (
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Search Results ({searchResults.length})
              </h2>

              {isSearching ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Searching events...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid gap-6">
                  {searchResults.map((event, index) => (
                    <div
                      key={index}
                      className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() =>
                        window.open(`/event/${event._id}`, "_self")
                      }
                    >
                      <div className="card-body">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="card-title text-lg">
                            {event.title ||
                              event.coreInfo?.eventName ||
                              "Untitled Event"}
                          </h3>
                          <div className="badge badge-outline">
                            {event.coreInfo?.country || "Unknown"}
                          </div>
                        </div>

                        {event.summary && (
                          <p className="text-base-content/80 text-sm line-clamp-3">
                            {event.summary}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-base-content/60">
                          {(event.coreInfo?.startingDate ||
                            event.coreInfo?.endDate) && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {formatDate(event.coreInfo?.startingDate)}
                                {event.coreInfo?.endDate &&
                                  ` - ${formatDate(event.coreInfo?.endDate)}`}
                              </span>
                            </div>
                          )}
                          {event.views && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{event.views.toLocaleString()} views</span>
                            </div>
                          )}
                        </div>

                        {event.coreInfo?.eventTags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {event.coreInfo.eventTags
                              .slice(0, 5)
                              .map((tag, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  className="badge badge-accent badge-sm"
                                >
                                  {tag}
                                </div>
                              ))}
                            {event.coreInfo.eventTags.length > 5 && (
                              <div className="badge badge-ghost badge-sm">
                                +{event.coreInfo.eventTags.length - 5} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-base-content/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-base-content/70 mb-2">
                    No Events Found
                  </h3>
                  <p className="text-base-content/60">
                    Try adjusting your search criteria or removing some filters
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
