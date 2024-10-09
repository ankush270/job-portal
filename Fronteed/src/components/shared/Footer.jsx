import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are committed to delivering top-quality tech solutions and helping businesses achieve their goals.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Services</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-500">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
