import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us – Why Notepad AI Exists",
	description: "Learn the story behind Notepad AI - a simple, intelligent notepad built for writers who value privacy and natural writing experience.",
	alternates: {
		canonical: "https://www.notepad-ai.online/about"
	}
};

export default function About() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Header */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					About Us – Why Notepad AI Exists
				</h1>
			</section>

			{/* Introduction */}
			<section className="mb-16">
				<p className="text-lg text-gray-600 mb-8">
					It started with frustration.
				</p>
				<p className="text-lg text-gray-600 mb-8">
					I needed a quick, simple way to take notes online - something distraction-free, fast, and reliable. But every tool I tried either felt bloated, 
					asked for an account, bombarded me with ads, or missed something essential: it didn't understand how I wanted to write.
				</p>
				<p className="text-lg text-gray-600 mb-8">
					That's when I realized the real problem wasn't just missing features - it was missing understanding. No tool adapted to how I write. 
					No tool used language as a guide. So I built Notepad AI - a place where writing feels natural, intelligent, and private.
				</p>
			</section>

			{/* Main Sections */}
			<div className="space-y-12">
				{/* Built for Writers */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">✍️</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Built for Writers, Not Accounts</h2>
					<p className="text-gray-600 mb-4">
						You don't have to log in. You don't have to sign up. You just start writing.
					</p>
					<p className="text-gray-600">
						Notepad AI is designed for people like me - people who value clarity over clutter, ideas over interfaces. 
						It's a notepad that works the moment you need it, without asking anything from you.
					</p>
				</section>

				{/* NLP at Core */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🧠</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">NLP at the Core</h2>
					<p className="text-gray-600">
						This isn't just a digital scratchpad. It's powered by Natural Language Processing, which means it understands your writing context as you go. 
						It's aware of structure, tone, and flow - and adapts quietly in the background to support you, not interrupt you.
					</p>
				</section>

				{/* Privacy */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔒</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Writing Should Be Private</h2>
					<p className="text-gray-600">
						Everything happens in your browser. Nothing is stored unless you choose to save it. There's no tracking, no surveillance, and no data mining. 
						Just you and your thoughts - as it should be.
					</p>
				</section>

				{/* Why Keep Building */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🌱</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Why I Keep Building It</h2>
					<p className="text-gray-600 mb-4">
						Because I still write notes every day.
					</p>
					<p className="text-gray-600">
						And every time someone else uses Notepad AI and tells me, "This is what I needed," it reminds me why I built it in the first place: 
						not to impress anyone, but to solve a real need - simply, intelligently, and without compromise.
					</p>
				</section>
			</div>

			{/* Closing Message */}
			<section className="mt-16 text-center">
				<p className="text-lg text-gray-600 mb-4">
					Thank you for using Notepad AI.
				</p>
				<p className="text-lg text-gray-600">
					This tool is personal. I hope it feels that way when you use it, too.
				</p>
			</section>

			{/* CTA */}
			<section className="mt-12 text-center">
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