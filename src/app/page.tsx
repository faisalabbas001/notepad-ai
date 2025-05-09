"use client";
import Editor from "@/components/Editor";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-white">
			<Editor />

			
			<div className="w-full max-w-6xl mx-auto px-4 py-12">
				{/* Feature Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					<div className="text-center">
						<h3 className="font-semibold text-lg mb-2">Minimalist Text Editor Interface</h3>
						<p className="text-gray-600">
							Experience a distraction-free writing environment with our elegantly designed minimalist text editor. 
							Perfect for focused writing and note-taking with a clean, intuitive interface.
						</p>
					</div>
					<div className="text-center">
						<h3 className="font-semibold text-lg mb-2">Real-time Autosave Protection</h3>
						<p className="text-gray-600">
							Your work is automatically protected with continuous local storage saving. 
							Every change is instantly secured in your browser, ensuring your content is never lost.
						</p>
					</div>
					<div className="text-center">
						<h3 className="font-semibold text-lg mb-2">Live Word Count Tracker</h3>
						<p className="text-gray-600">
							Monitor your writing progress with our real-time word counter. 
							Perfect for meeting word count requirements and tracking writing goals.
						</p>
					</div>
					<div className="text-center">
						<h3 className="font-semibold text-lg mb-2">Advanced Find & Replace</h3>
						<p className="text-gray-600">
							Efficiently manage your content with powerful search and replace functionality. 
							Quickly locate and modify text across your entire document.
						</p>
					</div>
					<div className="text-center">
						<h3 className="font-semibold text-lg mb-2">Built-in Spell Checker</h3>
						<p className="text-gray-600">
							Write with confidence using our integrated spell checker. 
							Instantly identify and correct spelling errors with browser-native spell checking technology.
						</p>
					</div>
					<div className="text-center">
						<h3 className="font-semibold text-lg mb-2">One-Click Print & Export</h3>
						<p className="text-gray-600">
							Easily print your documents or export them as PDF files. 
							Professional-quality output with just a single click.
						</p>
					</div>
				</div>

				{/* Info Sections */}
				<section className="mb-10">
					<h2 className="text-xl font-bold mb-2">Free Online Text Editor Overview</h2>
					<hr className="mb-4" />
					<p className="text-gray-700 leading-relaxed">
						Welcome to our advanced free online text editor - your complete solution for creating and editing text documents directly in your browser. 
						No registration or login required. Our editor combines powerful features with user-friendly design, making it ideal for quick notes, 
						document creation, and professional writing tasks. Experience the security of our innovative autosave system that preserves your work 
						every second, protecting against accidental data loss. Your documents remain accessible even after browser restarts, and you can easily 
						save files directly to your computer. Our comprehensive feature set includes professional-grade tools like undo/redo, copy/paste, 
						find and replace, font formatting, character mapping, date/time insertion, emoji support, spell checking, word counting, 
						and seamless printing capabilities.
					</p>
				</section>
				<section className="mb-10">
					<h2 className="text-xl font-bold mb-2">How Our Online Text Editor Works</h2>
					<hr className="mb-4" />
					<p className="text-gray-700 leading-relaxed">
						Our text editor leverages the power of HTML5 localStorage technology to provide seamless, automatic saving functionality. 
						Your content is securely stored directly on your device, ensuring complete privacy and data security. With a rapid 1-second 
						save interval, your work is constantly protected. Your documents remain safely stored in your browser until you choose to 
						clear your site data. Experience the reliability of our system by testing it yourself - simply type in the editor and 
						refresh the page to see your content preserved.
					</p>
				</section>
				<section className="mb-10">
					<h2 className="text-xl font-bold mb-2">Cross-Browser Compatibility</h2>
					<hr className="mb-4" />
					<p className="text-gray-700 leading-relaxed">
						Our online text editor is fully compatible with all major modern web browsers, including Google Chrome, Mozilla Firefox, 
						Safari, Opera, Microsoft Edge, and Internet Explorer. We also support the Steam browser for gaming enthusiasts. 
						To ensure optimal performance, please enable JavaScript in your browser settings.
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
		</main>
	);
}
