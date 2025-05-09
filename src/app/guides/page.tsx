import Link from "next/link";

export default function Guides() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					AI Note-Taking Tips & Productivity Guides
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					Welcome to the Notepad AI Blog — your resource hub for smarter writing, faster note-taking, and AI-powered productivity. 
					Whether you're a student, a professional, or a creative thinker, our guides are crafted using NLP to help you write better and think clearer.
				</p>
			</section>

			{/* Write Smarter Section */}
			<section className="mb-16">
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Write Smarter with AI</h2>
					<p className="text-gray-600 mb-6">
						What makes AI note-taking different? Natural Language Processing (NLP) allows Notepad AI to recognize your writing patterns, 
						structure your content automatically, and offer intelligent suggestions. Our blog dives into how to make the most of this — 
						from using contextual cues to organizing thoughts with semantic flow.
					</p>
					<h3 className="text-xl font-semibold mb-4">Popular Guides:</h3>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">How to Write Clearer Notes with AI Assistance</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Using NLP to Outline Essays or Articles Automatically</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">The Science Behind Smart Note Structuring</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Productivity Tips for Online Notepad Users</p>
						</li>
					</ul>
				</div>
			</section>

			{/* Productivity Tips Section */}
			<section className="mb-16">
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Take better notes in less time.</h2>
					<p className="text-gray-600 mb-6">
						Learn how to optimize your digital note-taking process using features like autosave, context-aware formatting, and no-login access. 
						Our tips are tailored to how real users engage with online notepads—and enhanced through NLP research.
					</p>
					<h3 className="text-xl font-semibold mb-4">Trending Posts:</h3>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Top 10 AI Note-Taking Tricks You Haven't Tried Yet</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Minimalist Writing: Why Less is More with AI Tools</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Online Notepad vs Word Processors: Which Is Best for Focus?</p>
						</li>
					</ul>
				</div>
			</section>

			{/* Real Use Cases Section */}
			<section className="mb-16">
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Real Use Cases, Real Results</h2>
					<p className="text-gray-600 mb-6">
						AI note-taking isn't just tech—it's transformation. Our guides explore how real people—from developers to authors—use Notepad AI 
						for everything from meeting notes to creative brainstorming. We explain the NLP under the hood and how it supports different writing styles.
					</p>
					<h3 className="text-xl font-semibold mb-4">Example Articles:</h3>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">How Coders Use Notepad AI to Draft Documentation</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Journaling with an AI-Powered Notepad: A Daily Habit</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">From Ideas to Outlines: Using NLP to Plan Blog Posts</p>
						</li>
					</ul>
				</div>
			</section>

			{/* Learn More Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<h2 className="text-2xl font-bold mb-4 text-center">Learn. Apply. Write.</h2>
				<p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
					Stay ahead of the curve with practical, NLP-informed advice. Our blog evolves with the technology, bringing you the latest in AI writing tools, 
					semantic search optimization, and natural language trends.
				</p>
				<p className="text-gray-600 text-center font-medium">
					Ready to explore? Start reading, start writing — and let the language work for you.
				</p>
			</section>

			{/* CTA Section */}
			<section className="text-center">
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Start Writing Now
				</Link>
			</section>
		</div>
	);
} 