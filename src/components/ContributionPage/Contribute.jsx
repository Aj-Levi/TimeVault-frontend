import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Tag,
  Users,
  BookOpen,
  Send,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Contribute = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    summary: "",
    historicalContext: "",
    prelude: "",
    coreInfo: {
      eventName: "",
      startingDate: "",
      endDate: "",
      country: "",
      locations: [],
      eventTags: [],
    },
    mainNarrative: {
      introduction: "",
      phases: [],
      chronologicalTimeline: [],
    },
    impactAndConsequences: {
      immediateAftermath: "",
      longTermConsequences: "",
      casualtiesAndLosses: {
        description: "",
      },
    },
    analysisAndInterpretation: {
      rootCauses: "",
      historicalSignificance: "",
      controversiesAndDebates: "",
      legacy: {
        commemoration: "",
        inPopularCulture: "",
      },
      sourcesAndReading: {
        furtherReading: [],
        primarySources: [],
        bibliography: "",
      },
    },
    keyPlayers: {
      individuals: [],
      groups: [],
    },
  });

  // UI state
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [currentPhase, setCurrentPhase] = useState({
    phaseTitle: "",
    phaseDescription: "",
  });
  const [currentTimelineItem, setCurrentTimelineItem] = useState({
    date: "",
    title: "",
    description: "",
  });
  const [currentIndividual, setCurrentIndividual] = useState({
    name: "",
    role: "",
    significance: "",
  });
  const [currentGroup, setCurrentGroup] = useState({
    name: "",
    side: "",
    role: "",
  });
  const [currentBook, setCurrentBook] = useState({
    title: "",
    author: "",
    year: "",
  });
  const [currentSource, setCurrentSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Helper functions
  const addLocation = () => {
    if (
      currentLocation.trim() &&
      !formData.coreInfo.locations.includes(currentLocation.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        coreInfo: {
          ...prev.coreInfo,
          locations: [...prev.coreInfo.locations, currentLocation.trim()],
        },
      }));
      setCurrentLocation("");
    }
  };

  const removeLocation = (index) => {
    setFormData((prev) => ({
      ...prev,
      coreInfo: {
        ...prev.coreInfo,
        locations: prev.coreInfo.locations.filter((_, i) => i !== index),
      },
    }));
  };

  const addTag = () => {
    if (
      currentTag.trim() &&
      !formData.coreInfo.eventTags.includes(currentTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        coreInfo: {
          ...prev.coreInfo,
          eventTags: [...prev.coreInfo.eventTags, currentTag.trim()],
        },
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      coreInfo: {
        ...prev.coreInfo,
        eventTags: prev.coreInfo.eventTags.filter((_, i) => i !== index),
      },
    }));
  };

  const addPhase = () => {
    if (
      currentPhase.phaseTitle.trim() &&
      currentPhase.phaseDescription.trim()
    ) {
      setFormData((prev) => ({
        ...prev,
        mainNarrative: {
          ...prev.mainNarrative,
          phases: [...prev.mainNarrative.phases, currentPhase],
        },
      }));
      setCurrentPhase({ phaseTitle: "", phaseDescription: "" });
    }
  };

  const removePhase = (index) => {
    setFormData((prev) => ({
      ...prev,
      mainNarrative: {
        ...prev.mainNarrative,
        phases: prev.mainNarrative.phases.filter((_, i) => i !== index),
      },
    }));
  };

  const addTimelineItem = () => {
    if (
      currentTimelineItem.date &&
      currentTimelineItem.title.trim() &&
      currentTimelineItem.description.trim()
    ) {
      setFormData((prev) => ({
        ...prev,
        mainNarrative: {
          ...prev.mainNarrative,
          chronologicalTimeline: [
            ...prev.mainNarrative.chronologicalTimeline,
            currentTimelineItem,
          ],
        },
      }));
      setCurrentTimelineItem({ date: "", title: "", description: "" });
    }
  };

  const removeTimelineItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      mainNarrative: {
        ...prev.mainNarrative,
        chronologicalTimeline: prev.mainNarrative.chronologicalTimeline.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const addIndividual = () => {
    if (currentIndividual.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        keyPlayers: {
          ...prev.keyPlayers,
          individuals: [...prev.keyPlayers.individuals, currentIndividual],
        },
      }));
      setCurrentIndividual({ name: "", role: "", significance: "" });
    }
  };

  const removeIndividual = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyPlayers: {
        ...prev.keyPlayers,
        individuals: prev.keyPlayers.individuals.filter((_, i) => i !== index),
      },
    }));
  };

  const addGroup = () => {
    if (currentGroup.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        keyPlayers: {
          ...prev.keyPlayers,
          groups: [...prev.keyPlayers.groups, currentGroup],
        },
      }));
      setCurrentGroup({ name: "", side: "", role: "" });
    }
  };

  const removeGroup = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyPlayers: {
        ...prev.keyPlayers,
        groups: prev.keyPlayers.groups.filter((_, i) => i !== index),
      },
    }));
  };

  const addBook = () => {
    if (currentBook.title.trim()) {
      setFormData((prev) => ({
        ...prev,
        analysisAndInterpretation: {
          ...prev.analysisAndInterpretation,
          sourcesAndReading: {
            ...prev.analysisAndInterpretation.sourcesAndReading,
            furtherReading: [
              ...prev.analysisAndInterpretation.sourcesAndReading
                .furtherReading,
              currentBook,
            ],
          },
        },
      }));
      setCurrentBook({ title: "", author: "", year: "" });
    }
  };

  const removeBook = (index) => {
    setFormData((prev) => ({
      ...prev,
      analysisAndInterpretation: {
        ...prev.analysisAndInterpretation,
        sourcesAndReading: {
          ...prev.analysisAndInterpretation.sourcesAndReading,
          furtherReading:
            prev.analysisAndInterpretation.sourcesAndReading.furtherReading.filter(
              (_, i) => i !== index
            ),
        },
      },
    }));
  };

  const addSource = () => {
    if (currentSource.trim()) {
      setFormData((prev) => ({
        ...prev,
        analysisAndInterpretation: {
          ...prev.analysisAndInterpretation,
          sourcesAndReading: {
            ...prev.analysisAndInterpretation.sourcesAndReading,
            primarySources: [
              ...prev.analysisAndInterpretation.sourcesAndReading
                .primarySources,
              currentSource.trim(),
            ],
          },
        },
      }));
      setCurrentSource("");
    }
  };

  const removeSource = (index) => {
    setFormData((prev) => ({
      ...prev,
      analysisAndInterpretation: {
        ...prev.analysisAndInterpretation,
        sourcesAndReading: {
          ...prev.analysisAndInterpretation.sourcesAndReading,
          primarySources:
            prev.analysisAndInterpretation.sourcesAndReading.primarySources.filter(
              (_, i) => i !== index
            ),
        },
      },
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.coreInfo.eventName.trim() ||
      !formData.summary.trim()
    ) {
      setMessage({
        type: "error",
        text: "Please fill in the required fields: Title, Event Name, and Summary.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${baseURL}/api/events/contribute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to submit contribution`
        );
      }

      const result = await response.json();
      setMessage({
        type: "success",
        text: "Thank you for your contribution! Your event has been submitted for review.",
      });

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        summary: "",
        historicalContext: "",
        prelude: "",
        coreInfo: {
          eventName: "",
          startingDate: "",
          endDate: "",
          country: "",
          locations: [],
          eventTags: [],
        },
        mainNarrative: {
          introduction: "",
          phases: [],
          chronologicalTimeline: [],
        },
        impactAndConsequences: {
          immediateAftermath: "",
          longTermConsequences: "",
          casualtiesAndLosses: {
            description: "",
          },
        },
        analysisAndInterpretation: {
          rootCauses: "",
          historicalSignificance: "",
          controversiesAndDebates: "",
          legacy: {
            commemoration: "",
            inPopularCulture: "",
          },
          sourcesAndReading: {
            furtherReading: [],
            primarySources: [],
            bibliography: "",
          },
        },
        keyPlayers: {
          individuals: [],
          groups: [],
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        type: "error",
        text:
          error.message || "Failed to submit contribution. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-base-300 py-12 px-4 mx-8 mt-8 rounded-3xl">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Contribute to History
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Share your knowledge and help us build the most comprehensive
            historical events database. Your contributions help preserve history
            for future generations.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Message Display */}
        {message.text && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            } mb-6`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Title *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., World War II"
                    className="input input-bordered w-full"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Event Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Official name of the event"
                    className="input input-bordered w-full"
                    value={formData.coreInfo.eventName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coreInfo: {
                          ...prev.coreInfo,
                          eventName: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subtitle</span>
                </label>
                <input
                  type="text"
                  placeholder="Brief descriptive subtitle"
                  className="input input-bordered w-full"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subtitle: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">Summary *</span>
                </label>
                <textarea
                  placeholder="Provide a concise summary of the event..."
                  className="textarea textarea-bordered h-24"
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Date and Location Information */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Date & Location Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Start Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={formData.coreInfo.startingDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coreInfo: {
                          ...prev.coreInfo,
                          startingDate: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">End Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={formData.coreInfo.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coreInfo: { ...prev.coreInfo, endDate: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Country
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Primary country where the event occurred"
                  className="input input-bordered w-full"
                  value={formData.coreInfo.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coreInfo: { ...prev.coreInfo, country: e.target.value },
                    }))
                  }
                />
              </div>

              {/* Locations */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Specific Locations
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a specific location..."
                    className="input input-bordered flex-1"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addLocation())
                    }
                  />
                  <button
                    type="button"
                    onClick={addLocation}
                    className="btn btn-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {formData.coreInfo.locations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.coreInfo.locations.map((location, index) => (
                      <div key={index} className="badge badge-secondary gap-2">
                        {location}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeLocation(index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Event Tags
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a tag (e.g., War, Politics, Culture)..."
                    className="input input-bordered flex-1"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="btn btn-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {formData.coreInfo.eventTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.coreInfo.eventTags.map((tag, index) => {
                      const badgeColors = [
                        "badge-primary",
                        "badge-secondary",
                        "badge-accent",
                        "badge-info",
                      ];
                      const colorClass =
                        badgeColors[index % badgeColors.length];
                      return (
                        <div
                          key={index}
                          className={`badge ${colorClass} gap-2`}
                        >
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTag(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Historical Context */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Historical Context</h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Historical Context
                  </span>
                </label>
                <textarea
                  placeholder="Describe the historical background and context leading to this event..."
                  className="textarea textarea-bordered h-32"
                  value={formData.historicalContext}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      historicalContext: e.target.value,
                    }))
                  }
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-4">Prelude</span>
                </label>
                <textarea
                  placeholder="Describe the events and circumstances that directly led to this event..."
                  className="textarea textarea-bordered h-32"
                  value={formData.prelude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prelude: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Main Narrative</h2>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold mr-4">Introduction</span>
                </label>
                <textarea
                  placeholder="Provide an introduction to the main narrative of the event..."
                  className="textarea textarea-bordered h-32"
                  value={formData.mainNarrative.introduction}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mainNarrative: {
                        ...prev.mainNarrative,
                        introduction: e.target.value,
                      },
                    }))
                  }
                ></textarea>
              </div>

              {/* Phases */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Event Phases</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Phase title..."
                    className="input input-bordered"
                    value={currentPhase.phaseTitle}
                    onChange={(e) =>
                      setCurrentPhase((prev) => ({
                        ...prev,
                        phaseTitle: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Phase description..."
                      className="input input-bordered flex-1"
                      value={currentPhase.phaseDescription}
                      onChange={(e) =>
                        setCurrentPhase((prev) => ({
                          ...prev,
                          phaseDescription: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={addPhase}
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {formData.mainNarrative.phases.length > 0 && (
                  <div className="space-y-2">
                    {formData.mainNarrative.phases.map((phase, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-base-100 p-3 rounded"
                      >
                        <div>
                          <div className="font-semibold text-primary">
                            {phase.phaseTitle}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {phase.phaseDescription}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePhase(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Chronological Timeline
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="date"
                    className="input input-bordered"
                    value={currentTimelineItem.date}
                    onChange={(e) =>
                      setCurrentTimelineItem((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Event title..."
                    className="input input-bordered"
                    value={currentTimelineItem.title}
                    onChange={(e) =>
                      setCurrentTimelineItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Event description..."
                      className="input input-bordered flex-1"
                      value={currentTimelineItem.description}
                      onChange={(e) =>
                        setCurrentTimelineItem((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={addTimelineItem}
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {formData.mainNarrative.chronologicalTimeline.length > 0 && (
                  <div className="space-y-2">
                    {formData.mainNarrative.chronologicalTimeline.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-base-100 p-3 rounded"
                        >
                          <div>
                            <div className="font-semibold text-primary">
                              {item.title}
                            </div>
                            <div className="text-sm text-secondary">
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-base-content/70">
                              {item.description}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTimelineItem(index)}
                            className="btn btn-ghost btn-sm"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Impact and Consequences */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">
                Impact & Consequences
              </h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Immediate Aftermath
                  </span>
                </label>
                <textarea
                  placeholder="Describe the immediate consequences and aftermath of the event..."
                  className="textarea textarea-bordered h-32"
                  value={formData.impactAndConsequences.immediateAftermath}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      impactAndConsequences: {
                        ...prev.impactAndConsequences,
                        immediateAftermath: e.target.value,
                      },
                    }))
                  }
                ></textarea>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Long-term Consequences
                  </span>
                </label>
                <textarea
                  placeholder="Describe the long-term impact and consequences of the event..."
                  className="textarea textarea-bordered h-32"
                  value={formData.impactAndConsequences.longTermConsequences}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      impactAndConsequences: {
                        ...prev.impactAndConsequences,
                        longTermConsequences: e.target.value,
                      },
                    }))
                  }
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Casualties & Losses
                  </span>
                </label>
                <textarea
                  placeholder="Describe any casualties, losses, or damages caused by the event..."
                  className="textarea textarea-bordered h-24"
                  value={
                    formData.impactAndConsequences.casualtiesAndLosses
                      .description
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      impactAndConsequences: {
                        ...prev.impactAndConsequences,
                        casualtiesAndLosses: { description: e.target.value },
                      },
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>

          {/* Key Players */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Key Players
              </h2>

              {/* Individuals */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Key Individuals
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Name..."
                    className="input input-bordered"
                    value={currentIndividual.name}
                    onChange={(e) =>
                      setCurrentIndividual((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Role..."
                    className="input input-bordered"
                    value={currentIndividual.role}
                    onChange={(e) =>
                      setCurrentIndividual((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Significance..."
                      className="input input-bordered flex-1"
                      value={currentIndividual.significance}
                      onChange={(e) =>
                        setCurrentIndividual((prev) => ({
                          ...prev,
                          significance: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={addIndividual}
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {formData.keyPlayers.individuals.length > 0 && (
                  <div className="space-y-2">
                    {formData.keyPlayers.individuals.map(
                      (individual, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-base-100 p-3 rounded"
                        >
                          <div>
                            <div className="font-semibold text-primary">
                              {individual.name}
                            </div>
                            <div className="text-sm text-secondary">
                              {individual.role}
                            </div>
                            <div className="text-sm text-base-content/70">
                              {individual.significance}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeIndividual(index)}
                            className="btn btn-ghost btn-sm"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Groups */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Key Groups/Organizations
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Group name..."
                    className="input input-bordered"
                    value={currentGroup.name}
                    onChange={(e) =>
                      setCurrentGroup((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Side/Affiliation..."
                    className="input input-bordered"
                    value={currentGroup.side}
                    onChange={(e) =>
                      setCurrentGroup((prev) => ({
                        ...prev,
                        side: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Role..."
                      className="input input-bordered flex-1"
                      value={currentGroup.role}
                      onChange={(e) =>
                        setCurrentGroup((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={addGroup}
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {formData.keyPlayers.groups.length > 0 && (
                  <div className="space-y-2">
                    {formData.keyPlayers.groups.map((group, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-base-100 p-3 rounded"
                      >
                        <div>
                          <div className="font-semibold text-primary">
                            {group.name}
                          </div>
                          <div className="text-sm text-secondary">
                            {group.side}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {group.role}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGroup(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis and Sources */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Analysis & Sources
              </h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">Root Causes</span>
                </label>
                <textarea
                  placeholder="Analyze the root causes and underlying factors..."
                  className="textarea textarea-bordered h-24"
                  value={formData.analysisAndInterpretation.rootCauses}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      analysisAndInterpretation: {
                        ...prev.analysisAndInterpretation,
                        rootCauses: e.target.value,
                      },
                    }))
                  }
                ></textarea>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Historical Significance
                  </span>
                </label>
                <textarea
                  placeholder="Explain the historical significance and importance of this event..."
                  className="textarea textarea-bordered h-24"
                  value={
                    formData.analysisAndInterpretation.historicalSignificance
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      analysisAndInterpretation: {
                        ...prev.analysisAndInterpretation,
                        historicalSignificance: e.target.value,
                      },
                    }))
                  }
                ></textarea>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Controversies & Debates
                  </span>
                </label>
                <textarea
                  placeholder="Describe any controversies, debates, or differing interpretations..."
                  className="textarea textarea-bordered h-24"
                  value={
                    formData.analysisAndInterpretation.controversiesAndDebates
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      analysisAndInterpretation: {
                        ...prev.analysisAndInterpretation,
                        controversiesAndDebates: e.target.value,
                      },
                    }))
                  }
                ></textarea>
              </div>

              {/* Further Reading */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Further Reading
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Book title..."
                    className="input input-bordered"
                    value={currentBook.title}
                    onChange={(e) =>
                      setCurrentBook((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Author..."
                    className="input input-bordered"
                    value={currentBook.author}
                    onChange={(e) =>
                      setCurrentBook((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Year..."
                      className="input input-bordered flex-1"
                      value={currentBook.year}
                      onChange={(e) =>
                        setCurrentBook((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={addBook}
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {formData.analysisAndInterpretation.sourcesAndReading
                  .furtherReading.length > 0 && (
                  <div className="space-y-2">
                    {formData.analysisAndInterpretation.sourcesAndReading.furtherReading.map(
                      (book, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-base-100 p-3 rounded"
                        >
                          <div>
                            <div className="font-semibold text-primary">
                              {book.title}
                            </div>
                            <div className="text-sm text-base-content/70">
                              {book.author && `by ${book.author}`}{" "}
                              {book.year && `(${book.year})`}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBook(index)}
                            className="btn btn-ghost btn-sm"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Primary Sources */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Primary Sources
                  </span>
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Add a primary source..."
                    className="input input-bordered flex-1"
                    value={currentSource}
                    onChange={(e) => setCurrentSource(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSource())
                    }
                  />
                  <button
                    type="button"
                    onClick={addSource}
                    className="btn btn-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {formData.analysisAndInterpretation.sourcesAndReading
                  .primarySources.length > 0 && (
                  <div className="space-y-2">
                    {formData.analysisAndInterpretation.sourcesAndReading.primarySources.map(
                      (source, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-base-100 p-3 rounded"
                        >
                          <div className="text-sm">{source}</div>
                          <button
                            type="button"
                            onClick={() => removeSource(index)}
                            className="btn btn-ghost btn-sm"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Bibliography */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-4">Bibliography</span>
                </label>
                <textarea
                  placeholder="Provide a formatted bibliography of sources used..."
                  className="textarea textarea-bordered h-32"
                  value={
                    formData.analysisAndInterpretation.sourcesAndReading
                      .bibliography
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      analysisAndInterpretation: {
                        ...prev.analysisAndInterpretation,
                        sourcesAndReading: {
                          ...prev.analysisAndInterpretation.sourcesAndReading,
                          bibliography: e.target.value,
                        },
                      },
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>

          {/* Legacy */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Legacy</h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    Commemoration
                  </span>
                </label>
                <textarea
                  placeholder="How is this event commemorated or remembered today?"
                  className="textarea textarea-bordered h-24"
                  value={
                    formData.analysisAndInterpretation.legacy.commemoration
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      analysisAndInterpretation: {
                        ...prev.analysisAndInterpretation,
                        legacy: {
                          ...prev.analysisAndInterpretation.legacy,
                          commemoration: e.target.value,
                        },
                      },
                    }))
                  }
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-4">
                    In Popular Culture
                  </span>
                </label>
                <textarea
                  placeholder="How has this event been portrayed in movies, books, art, or other cultural works?"
                  className="textarea textarea-bordered h-24"
                  value={
                    formData.analysisAndInterpretation.legacy.inPopularCulture
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      analysisAndInterpretation: {
                        ...prev.analysisAndInterpretation,
                        legacy: {
                          ...prev.analysisAndInterpretation.legacy,
                          inPopularCulture: e.target.value,
                        },
                      },
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Contribution
                    </>
                  )}
                </button>
                <p className="text-sm text-base-content/60 mt-4">
                  Your contribution will be reviewed by our team before being
                  published. Thank you for helping preserve history!
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contribute;
