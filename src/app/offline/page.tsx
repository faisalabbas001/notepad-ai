import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
	title: "Use Notepad AI Offline – No Internet, No Problem",
	description: "Thoughts don't wait for Wi-Fi. With offline language processing, Notepad AI stays responsive and context-aware, even without an internet connection.",
	alternates: {
		canonical: "https://www.notepad-ai.online/offline"
	}
};

export default function Offline() {
		return (
			<div className="w-3/4 mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Use Notepad AI Offline – No Internet, No Problem
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					Notepad AI isn't just smart - it's independent. With offline mode, you can write notes without an internet connection. 
					Powered by in-browser NLP, our tool understands and assists your writing even when you're completely offline.
				</p>
			</section>
            {/* Final CTA Section */}
			<section className="text-center mb-16">
				<p className="text-gray-600 mb-8 max-w-2xl mx-auto">
					Use Notepad AI Offline - Because creativity shouldn't depend on Wi-Fi.
				</p>
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Start Writing Offline
				</Link>
			</section>

			{/* Offline Features Grid */}
			<div className="grid md:grid-cols-2 gap-8 mb-16">
				{/* No Internet Required */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔌</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">No Internet Required for Writing</h2>
					<p className="text-gray-600">
						Whether you're on a plane, in a remote area, or simply disconnected, Notepad AI continues working without interruption. 
						The entire notepad - including NLP features - runs locally in your browser. You can write, edit, and auto-save notes with zero connectivity.
					</p>
				</div>

				{/* NLP Without Web */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🧠</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">NLP That Works Without the Web</h2>
					<p className="text-gray-600">
						Most AI tools require the cloud. Not Notepad AI. Our Natural Language Processing engine is client-side, meaning it's embedded 
						directly into your device. It understands sentence structure, detects intent, and formats notes even when offline.
					</p>
				</div>

				{/* Offline Auto-Save */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">💾</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Offline Auto-Save & Session Storage</h2>
					<p className="text-gray-600">
						Notes are saved automatically to your local browser storage. This offline-first model ensures that nothing is lost - your content 
						is preserved, even if your device goes to sleep or restarts. When you reconnect, sync options are available if enabled.
					</p>
				</div>

				{/* Privacy Section */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔒</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Privacy Stays Intact – Online or Offline</h2>
					<p className="text-gray-600">
						No connection means no risk. When offline, your data is fully contained within your device. There are no external requests, 
						background uploads, or remote scripts. Everything remains private, secure, and offline by design.
					</p>
				</div>
			</div>

			{/* How It Works Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<div className="text-3xl mb-4 text-center">⚙️</div>
				<h2 className="text-2xl font-bold mb-6 text-center">How Offline Mode Works</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">No Login Needed – Works instantly in any modern browser</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Local NLP Engine – Provides formatting, suggestions, and context without the cloud</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Autosave – Changes are tracked and saved in real-time</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Reconnection Sync – Optional cloud sync available when you come back online</p>
					</div>
				</div>
			</section>

			{/* Perfect For Section */}
			<section className="mb-16">
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-6 text-blue-600">Perfect For:</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Writing during travel</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Note-taking in low-connectivity environments</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Private journaling sessions</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Minimalist, focused writing without distractions</p>
						</li>
					</ul>
				</div>
			</section>
			<Footer />
		</div>
	);
} 