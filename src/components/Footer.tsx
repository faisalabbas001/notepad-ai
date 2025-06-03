import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className=" text-white border-t mt-5 border-[#2a2f3d]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">N</span>
              </div>
              <span className="text-xl font-bold">Notepad AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your writing experience with AI-powered tools and seamless document management.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="mailto:contact@notepadai.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-500">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Mobile', 'Features', 'Text to Docs', 'Text to PDF'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-500">Resources</h3>
            <ul className="space-y-2">
              {[
                'How it works',
                'Guides',
                'Offline',
                'Privacy',
                'About Us',
                'Privacy Policy'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-500">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-[#1A1D28] border border-[#2a2f3d] text-gray-300 focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2a2f3d]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Notepad AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
