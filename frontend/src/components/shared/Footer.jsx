import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo and Description */}
        <div className="col-span-1">
          <div className="flex items-center mb-4">
            <img
              src="logo1.jpeg"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="ml-2 text-xl font-bold text-white">
              TalentQuest
            </span>
          </div>
          <p>Making the world a better place through constructing elegant hierarchies.</p>
          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-white hover:scale-125">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white hover:scale-125">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="X" className="hover:text-white hover:scale-125">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-white hover:scale-125">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white hover:scale-125">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="col-span-1">
          <h4 className="font-semibold text-white mb-3">Solutions</h4>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">Marketing</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Analytics</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Commerce</a></li>
            <li><a href="#" className="hover:text-white">Insights</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">Pricing</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Documentation</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Guides</a></li>
            <li><a href="#" className="hover:text-white">API Status</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">About</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Blog</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Jobs</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
            <li><a href="#" className="hover:text-white">Partners</a></li>
          </ul>
        </div>

        {/* <div className="col-span-1">
          <h4 className="font-semibold text-white mb-3">Legal</h4>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">Claim</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div> */}
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-sm text-center">
        © 2020 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
