import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">TimeVault</h3>
            <p className="text-gray-400 mb-4">
              Explore the depths of history through our comprehensive collection
              of historical events, timelines, and cultural milestones.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/search"
                  className="hover:text-white transition-colors"
                >
                  Search Events
                </a>
              </li>
              <li>
                <a href="/globe" className="hover:text-white transition-colors">
                  Interactive Globe
                </a>
              </li>
              <li>
                <a
                  href="/timeline"
                  className="hover:text-white transition-colors"
                >
                  Historical Timeline
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Event Categories
                </a>
              </li>
              <li>
                <a
                  href="/featured"
                  className="hover:text-white transition-colors"
                >
                  Featured Events
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About TimeVault
                </a>
              </li>
              <li>
                <a
                  href="/methodology"
                  className="hover:text-white transition-colors"
                >
                  Our Methodology
                </a>
              </li>
              <li>
                <a
                  href="/sources"
                  className="hover:text-white transition-colors"
                >
                  Historical Sources
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="hover:text-white transition-colors"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for new historical discoveries,
              featured events, and educational content.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 btn btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TimeVault. All rights reserved.
              Preserving history for future generations.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <a
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a
                href="/accessibility"
                className="hover:text-white transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
