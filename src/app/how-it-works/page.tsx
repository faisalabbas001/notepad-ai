import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "How Notepad AI Works – Fast, Smart & Easy Note Taking",
	description: "Understand how our language engine works with you—detecting meaning, intent, and structure to create a responsive, human-like note-taking experience.",
	alternates: {
		canonical: "https://www.notepad-ai.online/how-it-works"
	}
};

export default function HowItWorks() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					How Notepad AI Works – Fast, Smart & Easy Note Taking
				</h1>
			</section>

			{/* CTA Section */}
			<section className="text-center mb-16">
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Try Notepad AI Now
				</Link>
			</section>

			{/* Main Content Grid */}
			<div className="grid md:grid-cols-2 gap-8 mb-16">
				{/* NLP Core */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Natural Language Processing at the Core</h2>
					<p className="text-gray-600">
						Notepad AI is powered by advanced Natural Language Processing (NLP) technology. As you write, the system understands the structure, 
						context, and intent of your words—just like a human would. This allows it to format, suggest, and improve your notes without needing 
						commands or formatting rules.
					</p>
				</div>

				{/* Auto-Save */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Instant Auto-Save with Context Awareness</h2>
					<p className="text-gray-600">
						Our auto-save feature isn't just a timer—it uses NLP to detect when meaningful content changes occur. Whether you're editing a sentence 
						or writing a list, Notepad AI saves your work instantly and intelligently, preserving version context where needed.
					</p>
				</div>

				{/* No Database */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">No Database. No Signup. Just You and the Notes</h2>
					<p className="text-gray-600">
						Unlike traditional note apps, Notepad AI doesn't store your data on external servers unless you choose to sync. By default, your content 
						is held securely in your browser. There's no login or account needed. This NLP-enhanced local-first design ensures speed, privacy, and control.
					</p>
				</div>

				{/* AI Understanding */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">AI That Understands What You're Writing</h2>
					<p className="text-gray-600">
						From recognizing tasks and bullet points to identifying headings and context shifts, Notepad AI uses NLP to make sense of your text. 
						It reacts to your writing style, helping structure notes without rigid templates. You just write—Notepad AI handles the rest.
					</p>
				</div>

				{/* Lightweight */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Lightweight, Yet Intelligent</h2>
					<p className="text-gray-600">
						No bulky apps. No distractions. Just a lightweight, AI-enhanced workspace that learns with you. The interface uses semantic cues to adapt 
						layout, spacing, and tone dynamically—making your writing experience smooth and smart.
					</p>
				</div>
			</div>

			{/* Behind the Scenes Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<h2 className="text-2xl font-bold mb-6 text-center">Behind the Scenes: What Makes It Work</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">NLP Engine – Powers intelligent suggestions and note structuring</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Client-Side AI – Keeps everything fast and secure without data leaving your device</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Change Detection – Monitors text patterns for smart auto-save triggers</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Contextual Parsing – Breaks down natural language into usable formats for cleaner organization</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Minimal Design – Built with simplicity and speed in mind, enhanced by AI logic</p>
					</div>
				</div>
			</section>

			{/* Why It Matters Section */}
			<section className="mb-16 text-center">
				<h2 className="text-2xl font-bold mb-4">Why It Matters</h2>
				<p className="text-gray-600 max-w-2xl mx-auto">
					You don't need to think about how to use Notepad AI. It simply works—with you, for you. From first word to final save, 
					everything is fast, responsive, and driven by language intelligence.
				</p>
			</section>

			
		</div>
	);
} 