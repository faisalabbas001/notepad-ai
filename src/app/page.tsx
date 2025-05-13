"use client";
import Editor from "@/components/Editor";
import Link from "next/link";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Editor />

      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">
              AI-Powered Online Notepad
            </h3>
            <p className="text-gray-600">
              Notepad AI is a free online notepad designed for intelligent
              note-taking. With built-in Natural Language Processing, it helps
              you write, organize, and save your ideas in real-time.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">No Login, No Hassle</h3>
            <p className="text-gray-600">
              Start writing instantly with our no-login online notepad. It
              respects your privacy and keeps your notes secure using local
              storage and NLP-enhanced autosave.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">
              Autosave & Local Privacy
            </h3>
            <p className="text-gray-600">
              All content is autosaved automatically and stored locally in your
              browser. This secure online notepad ensures that your notes are
              never lost or sent anywhere.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">
              Write Notes Online with NLP
            </h3>
            <p className="text-gray-600">
              Use this AI note-taking tool to create structured notes that adapt
              to your writing flow. The NLP system helps detect patterns,
              intent, and structure naturally.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">
              Minimal Interface, Maximum Focus
            </h3>
            <p className="text-gray-600">
              Our minimalist writing tool keeps distractions away while
              enhancing productivity. It's perfect for journaling, list-making,
              or drafting documents.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">
              Secure, Smart, and Free
            </h3>
            <p className="text-gray-600">
              Notepad AI is a secure online notepad with zero ads, zero
              tracking, and full privacy. It’s the smart way to write notes
              online - anytime, anywhere.
            </p>
          </div>
        </div>

        {/* NLP-Enhanced Informational Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2">
            What Makes Notepad AI Different?
          </h2>
          <hr className="mb-4" />
          <p className="text-gray-700 leading-relaxed">
            Unlike traditional editors, Notepad AI uses advanced Natural
            Language Processing to understand and support your writing process.
            Whether you're drafting notes, journaling ideas, or outlining
            content, our online notepad recognizes intent and adapts to your
            context. No setup. No clutter. Just fast, focused writing with
            real-time autosave and complete privacy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2">
            Why Choose a Free Notepad with AI?
          </h2>
          <hr className="mb-4" />
          <p className="text-gray-700 leading-relaxed">
            Notepad AI combines simplicity with intelligence. It’s not just a
            place to type - it's a free AI note-taking tool that supports your
            thinking. With no login required, NLP-enhanced structuring, and a
            lightweight interface, you can write and organize your thoughts
            clearly, safely, and without distraction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2">
            Accessible Anywhere, Anytime
          </h2>
          <hr className="mb-4" />
          <p className="text-gray-700 leading-relaxed">
            Whether you're on mobile or desktop, at home or offline, Notepad AI
            adapts. It’s designed for everyday use by writers, students, and
            creators who want a smart, secure place to think and write. All
            content stays with you - no server storage, no cloud unless you
            choose.
          </p>
        </section>

        {/* Learn More Section */}
        <section className="text-center mt-12">
          <Link
            href="/home"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Learn More About Our Notepad
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
