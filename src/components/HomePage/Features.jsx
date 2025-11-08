import React from "react";
import {
  Globe,
  Search,
  Clock,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Interactive 3D Earth",
      description:
        "Explore history through an interactive 3D globe. Select any country and discover historical events that shaped that region across different time periods.",
      highlight: "Visual Geography",
      gradient: "from-base-100 to-base-300",
    },
    {
      id: 2,
      icon: <Search className="w-12 h-12 text-secondary" />,
      title: "Advanced Search & Filters",
      description:
        "Powerful search capabilities with extensive filtering options. Search by date ranges, countries, event types, historical figures, and more.",
      highlight: "Smart Discovery",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      icon: <BookOpen className="w-12 h-12 text-info" />,
      title: "Detailed Event Profiles",
      description:
        "Rich, comprehensive event pages with images, documents, key figures, causes, consequences, and connections to other historical events.",
      highlight: "Deep Insights",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-8">
            Discover History Like Never Before
          </h2>
          <p className="text-lg text-base-content/90 max-w-3xl mx-auto">
            TimeVault revolutionizes how you explore and understand historical
            events. From interactive visualizations to comprehensive search
            capabilities, dive deep into the stories that shaped our world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300"
            >
              <div className="card-body text-center p-8">
                {/* Icon with gradient background */}
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                {/* Title */}
                <h3 className="card-title text-xl font-bold text-base-content mb-4 justify-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base-content/80 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
