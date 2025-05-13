import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
	title: "Privacy & Security – How Notepad AI Protects Your Notes",
	description: "Your words stay yours. Notepad AI processes language locally, avoids external tracking, and provides a trusted space for thought, reflection, and creativity.",
	alternates: {
		canonical: "https://www.notepad-ai.online/privacy"
	}
};

export default function Privacy() {
	return (
		<div className="w-3/4 mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Privacy & Security – How Notepad AI Protects Your Notes
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					At Notepad AI, your privacy isn't an afterthought - it's the foundation. Our platform uses Natural Language Processing (NLP) 
					to enhance your writing experience without ever compromising your personal data. No sign-ups. No tracking. Just a secure space to write.
				</p>
			</section>

            {/* CTA Section */}
			<section className="text-center mb-16">
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Start Writing Securely
				</Link>
			</section>

			{/* Privacy Features Grid */}
			<div className="grid md:grid-cols-2 gap-8 mb-16">
				{/* No Login Required */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔒</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">No Login Required – Truly Private Note Taking</h2>
					<p className="text-gray-600">
						We don't ask for emails or accounts. You can start writing instantly-no barriers, no credentials. Notepad AI is designed for 
						private note taking online, where your words stay with you unless you choose to export or sync them.
					</p>
				</div>

				{/* NLP Without Data Extraction */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🧠</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">NLP Without Data Extraction</h2>
					<p className="text-gray-600">
						Our AI features use client-side NLP, meaning all language understanding happens in your browser. Your content is never sent to 
						a server for processing. It's local, fast, and secure-just as private note-taking should be.
					</p>
				</div>

				{/* No Cloud by Default */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🛡️</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">No Cloud by Default – Local First</h2>
					<p className="text-gray-600">
						Unless you explicitly enable sync, your notes stay entirely in your browser's storage. We don't store, analyze, or transmit 
						your content behind the scenes. You write, and it stays on your device-protected from external access.
					</p>
				</div>

				{/* Optional Cloud Sync */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔐</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Optional Cloud Sync (Encrypted)</h2>
					<p className="text-gray-600">
						If you choose to sync notes across devices, your content is encrypted using modern standards. Combined with contextual NLP tagging, 
						this ensures fast retrieval and meaningful organization-without compromising security.
					</p>
				</div>
			</div>

			{/* No Tracking Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<div className="text-3xl mb-4 text-center">🧭</div>
				<h2 className="text-2xl font-bold mb-4 text-center">No Cookies. No Trackers. No Surveillance.</h2>
				<p className="text-gray-600 text-center max-w-2xl mx-auto">
					Notepad AI is free from advertising trackers, third-party cookies, or analytics scripts. Our commitment to privacy is simple: 
					we don't want your data. We want you to feel safe writing what matters.
				</p>
			</section>

			{/* Trust Section */}
			<section className="mb-16">
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">✅</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Built with Trust in Mind</h2>
					<p className="text-gray-600 mb-6">
						We've designed Notepad AI to meet the growing demand for secure online notepad tools. From autosave mechanisms that don't leak data 
						to NLP-powered enhancements that run locally, every feature is shaped around your safety and control.
					</p>
					<h3 className="text-xl font-semibold mb-4">Summary: Your Notes, Your Privacy</h3>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">No account required</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">NLP runs in-browser, never on external servers</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Local-first design with encrypted optional sync</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">No ads, trackers, or analytics</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Full control over your content, always</p>
						</li>
					</ul>
				</div>
			</section>
			<Footer />
		</div>
	);
} 