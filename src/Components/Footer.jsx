import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" w-full bg-gray-900 text-white py-4 px-4 z-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm mb-2">
          <Link to="/privacy-policy" className="hover:underline text-gray-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline text-gray-300">Terms Of Service</Link>
          <Link to="/refund-policy" className="hover:underline text-gray-300">Refund Policy</Link>
          <Link to="/team" className="hover:underline text-gray-300">Team</Link>
          <Link to="/contact" className="hover:underline text-gray-300">Contact Us</Link>
        </div>

        {/* Bottom row with © and Contact */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Noisy. All rights reserved.</span>
          <span className="hidden sm:inline">|</span>
          <span>
            Contact: <a href="mailto:shubham@noisy.co.in" className="hover:underline">shubham@noisy.co.in</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
