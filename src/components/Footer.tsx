import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-4">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Mobile
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/text-to-docs"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Text to Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/text-to-pdf"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Text to PDF
                </Link>
              </li>
              
              
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="space-y-2">
            <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-blue-600"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/offline"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Offline
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-600 hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Notepad AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
