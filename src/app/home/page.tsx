import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Free Online Notepad – Simple, Secure & Smart",
	description: "A natural, distraction-free space to write and think clearly. Built with language understanding in mind, Notepad AI helps you express and refine ideas as you go.",
	alternates: {
		canonical: "https://www.notepad-ai.online/home"
	}
};
export default function NotepadOnline() {
	
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Free Online Notepad – Simple, Secure & Smart
				</h1>
				<p className="text-xl text-gray-600 mb-8">
					Write, edit, and save your notes instantly with our online notepad. No downloads, no sign-up—just a fast, clean, and reliable tool to jot down your thoughts.
				</p>
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Start Writing Now
				</Link>
			</section>

			{/* Features Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-semibold mb-3 text-blue-600">Auto-Save Notes</h3>
						<p className="text-gray-600">Your work is automatically saved in real-time.</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-semibold mb-3 text-blue-600">No Account Needed</h3>
						<p className="text-gray-600">Open, write, and return anytime without logging in.</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-semibold mb-3 text-blue-600">Cross-Device Access</h3>
						<p className="text-gray-600">Use from desktop, tablet, or mobile.</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-semibold mb-3 text-blue-600">Secure & Private</h3>
						<p className="text-gray-600">We don't store your data; everything is encrypted.</p>
					</div>
				</div>
			</section>

			{/* Use Cases Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-center">Use Cases</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Draft blog posts or articles quickly</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Jot down meeting notes or to-do lists</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Brainstorm ideas and save them instantly</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Store temporary text or code snippets</p>
					</div>
				</div>
			</section>

			{/* Why Choose Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<h2 className="text-3xl font-bold mb-6 text-center">Why Choose Our Notepad?</h2>
				<p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
					Our minimalist online notepad focuses on what matters most: speed, usability, and privacy. Whether you're writing a novel or a grocery list, it adapts to you.
				</p>
			</section>

			{/* CTA Section */}
			<section className="text-center">
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Try It Now - It's Free
				</Link>
			</section>
		</div>
	);
} 