import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Convert TXT to DOC Online – Free Text to Word Converter | Notepad AI",
  description:
    "Convert TXT to DOC or DOCX format online with our fast, secure, AI-powered converter. No software, no login, just easy text to Word conversion.",
  alternates: {
    canonical: "https://www.notepad-ai.online/text-to-docs",
  },
  keywords: [
    "txt to doc, txt to word, convert text file to doc, txt to word converter, convert text to word doc, free txt to doc converter, text to word online, doc file converter, secure text to doc conversion, no download txt to doc",
  ],
  applicationName: "Online Notepad",
};

export default function TextToDocsPage() {
  return (
    <div className="w-3/4 mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Convert TXT to DOC Online – Fast, Free & Easy Text to Word Converter
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
          Why Use Our Text to DOC Converter?
        </h2>
      </section>
      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Instant Conversion */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Instant TXT to DOC Conversion
          </h2>
          <p className="text-gray-600">
            Upload your text files and convert them to DOC instantly. Our AI-powered converter understands formatting and structure to deliver professional results in seconds.
          </p>
        </div>

        {/* NLP-Enhanced */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            NLP-Enhanced Formatting
          </h2>
          <p className="text-gray-600">
            Our converter uses Natural Language Processing to preserve your text’s natural flow, enhancing readability and ensuring your notes look clean and structured in DOC or DOCX format.
          </p>
        </div>

        {/* No Software */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            No Software Required
          </h2>
          <p className="text-gray-600">
            Use directly in your browser without installing any software. Convert your TXT files to DOC or DOCX on desktop or mobile, securely and hassle-free.
          </p>
        </div>

        {/* Secure & Private */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Secure & Private
          </h2>
          <p className="text-gray-600">
            Your files are processed locally and deleted automatically after conversion. Our secure text to doc conversion keeps your documents private and protected.
          </p>
        </div>

        {/* Format Support */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Supports DOC & DOCX Formats
          </h2>
          <p className="text-gray-600">
            Choose your preferred output format. Our txt to word converter supports both DOC and DOCX to fit your workflow needs.
          </p>
        </div>
      </div>

      {/* Perfect For Section */}
      <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfect For</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-gray-600">
              Students converting lecture notes to polished Word documents
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-gray-600">
              Writers transforming drafts into DOC files for editing and collaboration
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-gray-600">
              Business users formatting plain text into reports or letters in DOC format
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mb-16 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Experience the smartest way to <strong>convert text to word doc</strong> online. Our <strong>txt to doc</strong> converter is AI-powered, secure, and designed for effortless, NLP-enhanced text file conversion.
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
