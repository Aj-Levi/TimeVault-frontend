import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  BookOpen,
  ExternalLink,
  User,
  Loader2,
  AlertCircle,
  Sparkles,
  List,
} from "lucide-react";
import { useParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const EventPage = () => {
  const { id: idParam } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [bulletPoints, setBulletPoints] = useState([]);
  const [bulletPointsLoading, setBulletPointsLoading] = useState(false);
  const [showBulletPoints, setShowBulletPoints] = useState(false);

  const fetchEventById = async (id, isRetry = false) => {
    if (!id) {
      setError("No event ID provided");
      setLoading(false);
      return;
    }

    if (!baseURL) {
      setError("API base URL is not configured");
      setLoading(false);
      return;
    }

    if (!isRetry) {
      setLoading(true);
      setError(null);
    }

    try {
      const resp = await fetch(`${baseURL}/api/events/id/${id}`);
      if (!resp.ok) {
        if (resp.status === 404) {
          throw new Error("Event not found");
        } else if (resp.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          const text = await resp.text();
          throw new Error(text || `HTTP ${resp.status}: Failed to fetch event`);
        }
      }

      const data = await resp.json();

      // Validate that we received valid event data
      if (!data || typeof data !== "object") {
        throw new Error("Invalid event data received");
      }

      console.log("Event data:", data);
      setEvent(data);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error("Fetch event error:", err);
      setError(err.message || "Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchEventById(idParam, true);
  };

  useEffect(() => {
    fetchEventById(idParam);
  }, [idParam]);

  useEffect(() => {
    const incrementViewCount = async () => {
      if (!idParam) return;

      try {
        await fetch(`${baseURL}/api/events/inc_views`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idParam,
          }),
        });
        // No need to handle response as it's just incrementing view count
      } catch (error) {
        console.warn("Failed to increment view count:", error);
        // Silently fail - view count increment is not critical for user experience
      }
    };

    incrementViewCount();
  }, [idParam]);

  const fetchBulletPoints = async () => {
    if (!idParam) return;

    setShowBulletPoints(true);
    setBulletPointsLoading(true);

    try {
      const response = await fetch(
        `${baseURL}/api/events/gemini-bullets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idParam,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to fetch bullet points`
        );
      }

      const data = await response.json();

      // Validate that we received an array
      if (Array.isArray(data)) {
        setBulletPoints(data);
      } else {
        console.warn("Invalid bullet points data received:", data);
        setBulletPoints([]);
      }
    } catch (error) {
      console.error("Failed to fetch bullet points:", error);
      setBulletPoints([]);
    } finally {
      setBulletPointsLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-100">
        {/* Loading Hero Skeleton */}
        <div className="bg-linear-to-r from-primary to-secondary py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center text-white">
              <div className="animate-pulse">
                <div className="h-12 bg-white/20 rounded mb-4 max-w-2xl mx-auto"></div>
                <div className="h-6 bg-white/15 rounded mb-6 max-w-xl mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    >
                      <div className="h-6 bg-white/20 rounded mb-2 mx-auto w-8"></div>
                      <div className="h-4 bg-white/15 rounded mb-1"></div>
                      <div className="h-3 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Content Skeleton */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card bg-base-200 shadow-xl">
                  <div className="card-body animate-pulse">
                    <div className="h-6 bg-base-300 rounded mb-4 w-1/3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-base-300 rounded"></div>
                      <div className="h-4 bg-base-300 rounded"></div>
                      <div className="h-4 bg-base-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="card bg-base-200 shadow-xl">
                  <div className="card-body animate-pulse">
                    <div className="h-5 bg-base-300 rounded mb-4 w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-base-300 rounded"></div>
                      <div className="h-3 bg-base-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="h-16 w-16 text-error mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-base-content mb-4">
            Error Loading Event
          </h2>
          <p className="text-base-content/70 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="btn btn-primary"
              onClick={handleRetry}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Retrying...
                </>
              ) : (
                <>Try Again {retryCount > 0 && `(${retryCount})`}</>
              )}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Event not found state
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="h-16 w-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-base-content mb-4">
            Event Not Found
          </h2>
          <p className="text-base-content/70 mb-6">
            The requested historical event could not be found. It may have been
            removed or the URL might be incorrect.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.warn("Invalid date:", dateString);
      return "Invalid Date";
    }
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return null;
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return null;
      }

      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Same day";
      if (diffDays === 1) return "1 day";
      if (diffDays < 30) return `${diffDays} days`;
      if (diffDays < 365) return `${Math.round(diffDays / 30)} months`;
      return `${Math.round(diffDays / 365)} years`;
    } catch (error) {
      console.warn("Error calculating duration:", error);
      return null;
    }
  };

  // Safe property access helper
  const getSafeValue = (obj, path, defaultValue = null) => {
    try {
      return (
        path.split(".").reduce((current, key) => current?.[key], obj) ??
        defaultValue
      );
    } catch {
      return defaultValue;
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-base-300 py-16 px-4 mx-8 mt-8 rounded-3xl">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl text-base-content font-bold mb-8">
              {getSafeValue(event, "title") ||
                getSafeValue(event, "coreInfo.eventName") ||
                "Untitled Event"}
            </h1>
            {getSafeValue(event, "subtitle") && (
              <p className="text-xl md:text-2xl text-accent-content mb-8 max-w-4xl mx-auto">
                {event.subtitle}
              </p>
            )}

            {/* Key Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-semibold mb-2 text-primary">
                  Duration
                </div>
                <div className="text-xs">
                  {formatDate(getSafeValue(event, "coreInfo.startingDate"))} -{" "}
                  {formatDate(getSafeValue(event, "coreInfo.endDate"))}
                </div>
                {calculateDuration(
                  getSafeValue(event, "coreInfo.startingDate"),
                  getSafeValue(event, "coreInfo.endDate")
                ) && (
                  <div className="text-xs text-white/80 mt-1">
                    (
                    {calculateDuration(
                      getSafeValue(event, "coreInfo.startingDate"),
                      getSafeValue(event, "coreInfo.endDate")
                    )}
                    )
                  </div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-semibold mb-2 text-primary">
                  Location
                </div>
                <div className="text-xs">
                  {getSafeValue(event, "coreInfo.country") || "Unknown"}
                </div>
                {getSafeValue(event, "coreInfo.locations", []).length > 0 && (
                  <div className="text-xs text-white/80 mt-1">
                    {getSafeValue(event, "coreInfo.locations", []).join(", ")}
                  </div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-semibold mb-2 text-primary">
                  Views
                </div>
                <div className="text-xs">
                  {(getSafeValue(event, "views", 0) || 0).toLocaleString()}{" "}
                  views
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini bullet points generation button */}
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="text-center">
          <button
            onClick={fetchBulletPoints}
            disabled={bulletPointsLoading}
            className="btn btn-primary btn-lg gap-2"
          >
            {bulletPointsLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Key Points...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate AI Key Points
              </>
            )}
          </button>
          <p className="text-sm text-base-content/80 mt-4">
            Generate AI-powered bullet points summarizing this historical event
          </p>
        </div>
      </div>

      {/* Bullet Points display section */}
      {showBulletPoints && (
        <div className="container mx-auto max-w-6xl px-4 pb-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                <List className="h-6 w-6" />
                AI-Generated Key Points
              </h2>
              
              {bulletPointsLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-base-content/70">
                    AI is analyzing the event and generating key points...
                  </p>
                </div>
              ) : bulletPoints.length > 0 ? (
                <div className="space-y-3">
                  {bulletPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-base-100 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-base-content leading-relaxed flex-1">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
                  <p className="text-base-content/70">
                    No key points could be generated for this event. Please try again.
                  </p>
                  <button
                    onClick={fetchBulletPoints}
                    className="btn btn-outline btn-sm mt-4"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            {event.summary && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Overview</h2>
                  <p className="text-base-content leading-relaxed">
                    {event.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Historical Context */}
            {event.historicalContext && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">
                    Historical Context
                  </h2>
                  <p className="text-base-content leading-relaxed">
                    {event.historicalContext}
                  </p>
                </div>
              </div>
            )}

            {/* Prelude */}
            {event.prelude && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Prelude</h2>
                  <p className="text-base-content leading-relaxed">
                    {event.prelude}
                  </p>
                </div>
              </div>
            )}

            {/* Main Narrative */}
            {event.mainNarrative && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Main Narrative</h2>

                  {event.mainNarrative.introduction && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Introduction
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {event.mainNarrative.introduction}
                      </p>
                    </div>
                  )}

                  {/* Phases */}
                  {event.mainNarrative.phases?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Phases</h3>
                      <div className="space-y-4">
                        {event.mainNarrative.phases.map((phase, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-primary pl-4"
                          >
                            <h4 className="font-semibold text-primary">
                              {phase.phaseTitle}
                            </h4>
                            <p className="text-sm text-base-content/80 mt-1">
                              {phase.phaseDescription}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  {event.mainNarrative.chronologicalTimeline?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                      <div className="timeline timeline-vertical">
                        {event.mainNarrative.chronologicalTimeline.map(
                          (item, index) => (
                            <div key={index} className="timeline-item">
                              <div className="timeline-start">
                                {formatDate(item.date)}
                              </div>
                              <div className="timeline-middle">
                                <div className="w-4 h-4 bg-primary rounded-full"></div>
                              </div>
                              <div className="timeline-end timeline-box">
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-base-content/80">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Impact and Consequences */}
            {event.impactAndConsequences && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">
                    Impact & Consequences
                  </h2>

                  {event.impactAndConsequences.immediateAftermath && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Immediate Aftermath
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {event.impactAndConsequences.immediateAftermath}
                      </p>
                    </div>
                  )}

                  {event.impactAndConsequences.longTermConsequences && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Long-term Consequences
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {event.impactAndConsequences.longTermConsequences}
                      </p>
                    </div>
                  )}

                  {event.impactAndConsequences.casualtiesAndLosses
                    ?.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Casualties & Losses
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {
                          event.impactAndConsequences.casualtiesAndLosses
                            .description
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analysis and Interpretation */}
            {event.analysisAndInterpretation && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">
                    Analysis & Interpretation
                  </h2>

                  {event.analysisAndInterpretation.rootCauses && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Root Causes
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {event.analysisAndInterpretation.rootCauses}
                      </p>
                    </div>
                  )}

                  {event.analysisAndInterpretation.historicalSignificance && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Historical Significance
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {event.analysisAndInterpretation.historicalSignificance}
                      </p>
                    </div>
                  )}

                  {event.analysisAndInterpretation.controversiesAndDebates && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Controversies & Debates
                      </h3>
                      <p className="text-base-content leading-relaxed">
                        {
                          event.analysisAndInterpretation
                            .controversiesAndDebates
                        }
                      </p>
                    </div>
                  )}

                  {/* Legacy */}
                  {(event.analysisAndInterpretation.legacy?.commemoration ||
                    event.analysisAndInterpretation.legacy
                      ?.inPopularCulture) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Legacy</h3>
                      {event.analysisAndInterpretation.legacy.commemoration && (
                        <div className="mb-2">
                          <h4 className="font-medium">Commemoration</h4>
                          <p className="text-sm text-base-content/80">
                            {
                              event.analysisAndInterpretation.legacy
                                .commemoration
                            }
                          </p>
                        </div>
                      )}
                      {event.analysisAndInterpretation.legacy
                        .inPopularCulture && (
                        <div>
                          <h4 className="font-medium">In Popular Culture</h4>
                          <p className="text-sm text-base-content/80">
                            {
                              event.analysisAndInterpretation.legacy
                                .inPopularCulture
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            {event.coreInfo?.eventTags?.length > 0 && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.coreInfo.eventTags.map((tag, index) => {
                      // Define different badge colors
                      const badgeColors = [
                        "badge-primary",
                        "badge-secondary",
                        "badge-accent",
                        "badge-info",
                      ];
                      // Use modulo to cycle through colors
                      const colorClass =
                        badgeColors[index % badgeColors.length];

                      return (
                        <div key={index} className={`badge ${colorClass}`}>
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Key Players */}
            {(event.keyPlayers?.individuals?.length > 0 ||
              event.keyPlayers?.groups?.length > 0) && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">
                    <Users className="h-5 w-5" />
                    Key Players
                  </h3>

                  {/* Individuals */}
                  {event.keyPlayers.individuals?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Individuals</h4>
                      <div className="space-y-2">
                        {event.keyPlayers.individuals.map((person, index) => (
                          <div key={index} className="flex items-start gap-3">
                            {person.imageUrl ? (
                              <img
                                src={person.imageUrl}
                                alt={person.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                            <div>
                              <h5 className="font-medium">{person.name}</h5>
                              {person.role && (
                                <p className="text-xs text-base-content/70">
                                  {person.role}
                                </p>
                              )}
                              {person.significance && (
                                <p className="text-xs text-base-content/60 mt-1">
                                  {person.significance}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Groups */}
                  {event.keyPlayers.groups?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Groups</h4>
                      <div className="space-y-2">
                        {event.keyPlayers.groups.map((group, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-secondary pl-3"
                          >
                            <h5 className="font-medium">{group.name}</h5>
                            {group.side && (
                              <p className="text-xs text-base-content/70">
                                Side: {group.side}
                              </p>
                            )}
                            {group.role && (
                              <p className="text-xs text-base-content/60">
                                {group.role}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sources and Reading */}
            {event.analysisAndInterpretation?.sourcesAndReading && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">
                    <BookOpen className="h-5 w-5" />
                    Sources & Reading
                  </h3>

                  {/* Further Reading */}
                  {event.analysisAndInterpretation.sourcesAndReading
                    .furtherReading?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Further Reading</h4>
                      <div className="space-y-2">
                        {event.analysisAndInterpretation.sourcesAndReading.furtherReading.map(
                          (book, index) => (
                            <div key={index} className="text-sm">
                              <p className="font-medium">{book.title}</p>
                              {book.author && (
                                <p className="text-base-content/70">
                                  by {book.author}
                                </p>
                              )}
                              {book.year && (
                                <p className="text-base-content/60">
                                  ({book.year})
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Primary Sources */}
                  {event.analysisAndInterpretation.sourcesAndReading
                    .primarySources?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Primary Sources</h4>
                      <div className="space-y-1">
                        {event.analysisAndInterpretation.sourcesAndReading.primarySources.map(
                          (source, index) => (
                            <div
                              key={index}
                              className="text-sm text-base-content/80"
                            >
                              {typeof source === "string"
                                ? source
                                : JSON.stringify(source)}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bibliography */}
                  {event.analysisAndInterpretation.sourcesAndReading
                    .bibliography && (
                    <div>
                      <h4 className="font-semibold mb-2">Bibliography</h4>
                      <p className="text-sm text-base-content/80 whitespace-pre-line">
                        {
                          event.analysisAndInterpretation.sourcesAndReading
                            .bibliography
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
