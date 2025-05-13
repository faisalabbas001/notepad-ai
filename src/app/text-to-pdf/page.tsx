import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Convert Text to PDF Online – Free, Fast & Secure TXT to PDF Converter",
  description: "Convert text to PDF easily with our free online text to PDF converter. Secure, no login, no software needed. Turn TXT, text documents into high-quality PDFs.",
  alternates: {
    canonical: "https://www.notepad-ai.online/text-to-pdf",
  },
  keywords: [
    "text to pdf, convert text to pdf, text to pdf converter, textdocument to pdf, txt to pdf, free text to pdf converter, online txt to pdf, secure text to pdf conversion, no software text to pdf, text to pdf online converter",
  ],
  applicationName: "Online Notepad",
};

export default function TextToPdfPage() {
  return (
    <div className="w-3/4 mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Convert Text to PDF Online – Free, Fast & Secure TXT to PDF Converter
        </h1>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-16">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try Converter Now
        </Link>
      </section>

      <section>
        <h2 className="text-4xl font-bold mb-4 text-blue-600 text-center">
          Why Choose Our Text to PDF Converter?
        </h2>
      </section>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Instant Text to PDF Conversion</h2>
          <p className="text-gray-600">
            Convert your text files into high-quality PDFs within seconds. Our AI-powered <strong>text to pdf converter</strong> ensures accurate formatting and secure processing.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">No Software or Login Required</h2>
          <p className="text-gray-600">
            Use our <strong>online txt to pdf</strong> converter directly in your browser. No downloads, no installations, and no account needed — perfect for fast, on-the-go conversions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Secure, Private & Fast</h2>
          <p className="text-gray-600">
            We prioritize your privacy. All <strong>text to pdf</strong> conversions happen in-browser, ensuring your files are never uploaded or stored on external servers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Supports TXT, Textdocument to PDF</h2>
          <p className="text-gray-600">
            Whether you need to convert a <strong>txt to pdf</strong> or a <strong>textdocument to pdf</strong>, our tool supports multiple formats, giving you flexibility and control.
          </p>
        </div>
      </div>

      {/* Use Cases Section */}
      <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfect For</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-gray-600">Students converting essays or notes to PDF for submissions</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-gray-600">Writers formatting text drafts into PDF for publishing or sharing</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-gray-600">Business users converting plain text into formal PDF documents</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mb-16 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Try our free <strong>text to pdf converter</strong> now. Whether you're looking to <strong>convert text to pdf</strong>, <strong>textdocument to pdf</strong>, or use a secure <strong>txt to pdf</strong> converter, our AI-powered tool delivers fast, private, and hassle-free conversions.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Converting Now
        </Link>
      </section>
      <Footer />
    </div>
  );
} 