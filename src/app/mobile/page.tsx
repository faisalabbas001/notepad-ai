import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Notepad AI on Mobile – Write Notes Anywhere, Anytime",
	description: "Language adapts to your world. Write freely from any device with an AI that understands how you think-even on the go.",
	alternates: {
		canonical: "https://www.notepad-ai.online/mobile"
	}
};

export default function Mobile() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Notepad AI on Mobile – Write Notes Anywhere, Anytime
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					Notepad AI works seamlessly on any device - and it's fully optimized for mobile. Whether you're jotting down thoughts on the go 
					or drafting ideas between meetings, our mobile notepad gives you the full power of AI and NLP in the palm of your hand.
				</p>
			</section>

            {/* Final CTA Section */}
			<section className="text-center mb-16">
				<p className="text-gray-600 mb-8 max-w-2xl mx-auto">
					Whether you're in a meeting, commuting, or brainstorming in a coffee shop, Notepad AI on mobile gives you the freedom to write 
					anywhere, anytime - smarter, faster, and more privately.
				</p>
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Start Writing on Mobile
				</Link>
			</section>

			{/* Mobile Features Grid */}
			<div className="grid md:grid-cols-2 gap-8 mb-16">
				{/* Mobile-First Design */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">📱</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Mobile-First Design, NLP Intelligence</h2>
					<p className="text-gray-600">
						Our interface adapts fluidly to small screens. With Natural Language Processing (NLP) at its core, Notepad AI understands your inputs 
						contextually, helping you take faster, cleaner, and smarter notes - without extra taps or formatting steps.
					</p>
				</div>

				{/* Write Notes on Your Phone */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">✍️</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Write Notes on Your Phone with Ease</h2>
					<p className="text-gray-600">
						Need to write something down quickly? Launch Notepad AI on your phone and start typing. There's no login, no app to install, 
						and no distractions. Everything happens in your mobile browser - powered by lightweight, client-side AI.
					</p>
				</div>

				{/* Instant Auto-Save */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">⚡</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Instant Auto-Save, Even on the Go</h2>
					<p className="text-gray-600">
						On mobile, time matters. Our NLP-enhanced auto-save feature detects when you've written something meaningful and saves it automatically 
						- even if your connection drops or your screen locks.
					</p>
				</div>

				{/* Private & Secure */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔒</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Private & Secure on Mobile</h2>
					<p className="text-gray-600">
						Notepad AI's privacy-first architecture works the same on your phone as it does on desktop. Your notes are stored locally in your 
						mobile browser, and NLP processing happens on-device. No tracking. No data leaks. Just secure mobile writing.
					</p>
				</div>
			</div>

			{/* Sync Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<div className="text-3xl mb-4 text-center">🔄</div>
				<h2 className="text-2xl font-bold mb-4 text-center">Seamless Sync (Optional)</h2>
				<p className="text-gray-600 text-center max-w-2xl mx-auto">
					Want to access your notes on both phone and desktop? Enable encrypted cloud sync and switch devices effortlessly. Notes are organized 
					using semantic context for easy navigation - powered by NLP for better structure and recall.
				</p>
			</section>

			{/* Why Use Section */}
			<section className="mb-16">
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-6 text-blue-600">Why Use Notepad AI on Mobile?</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Fast, distraction-free interface</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">AI note structuring and autosave</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">No download or installation required</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Mobile browser support across iOS and Android</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Privacy built-in, with secure optional sync</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Ideal for writing ideas, lists, or journaling on the go</p>
						</li>
					</ul>
				</div>
			</section>

			
		</div>
	);
} 