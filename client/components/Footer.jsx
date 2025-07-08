import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">JobHunt</h2>
          <p className="text-sm">
            Your go-to platform to find your dream job. Trusted by thousands of
            professionals and top companies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Stay updated with the latest job posts.
          </p>
          <form className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-300 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
