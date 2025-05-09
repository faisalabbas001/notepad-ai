import Link from "next/link";

export default function Features() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Features of Notepad AI – Auto Save, No Login, Secure Notes
				</h1>
			</section>

			{/* Main Features Grid */}
			<div className="grid md:grid-cols-2 gap-8 mb-16">
				{/* Smart AI Writing */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Smart, AI-Assisted Writing</h2>
					<p className="text-gray-600">
						Our online notepad uses AI to help you write better, faster. Whether you're drafting quick notes or composing long-form content, 
						the built-in NLP engine understands your context and suggests improvements in real time—enhancing grammar, structure, and clarity as you type.
					</p>
				</div>

				{/* Auto-Save */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Auto-Save Every Word, Instantly</h2>
					<p className="text-gray-600">
						Never lose a thought. Our real-time auto-save feature uses NLP-backed detection to identify meaningful text changes and save them instantly—with zero effort on your part. 
						There's no "Save" button. It just works.
					</p>
				</div>

				{/* No Login */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">No Login Required – Private by Design</h2>
					<p className="text-gray-600">
						Write freely without creating an account. Notepad AI respects your privacy. No email, no sign-up, no tracking. 
						Your content is stored securely in your browser or session—and you're always in control.
					</p>
				</div>

				{/* Cloud Sync */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Seamless Cloud Sync (Optional)</h2>
					<p className="text-gray-600">
						Want to access your notes across devices? Enable secure cloud sync. Your notes are encrypted and synced using contextual tagging, 
						making retrieval fast and intelligent.
					</p>
				</div>

				{/* Device Compatibility */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Works on Any Device</h2>
					<p className="text-gray-600">
						From mobile to desktop, our NLP-powered interface adapts to your screen and input method. Whether typing a note on your phone or 
						pasting code from your laptop, it feels smooth and intuitive.
					</p>
				</div>

				{/* Context-Aware */}
				<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<h2 className="text-2xl font-bold mb-4 text-blue-600">Context-Aware Note Structuring</h2>
					<p className="text-gray-600">
						Using NLP, Notepad AI automatically detects lists, headings, and bullet points as you write. It intelligently structures your text, 
						making your notes cleaner and more readable without manual formatting.
					</p>
				</div>
			</div>

			{/* Security Section */}
			<section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
				<h2 className="text-2xl font-bold mb-4 text-center">Secure & Encrypted</h2>
				<p className="text-gray-600 text-center max-w-2xl mx-auto">
					Your data stays yours. Notes stored via cloud sync are encrypted. Local session notes never leave your browser unless you choose to export or sync. 
					Our AI runs client-side for maximum privacy.
				</p>
			</section>

			{/* Summary Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-center">Summary of Features</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">AI-Powered Writing Assistant – Improves text clarity, grammar, and intent in real time</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Instant Auto-Save – Notes are saved automatically as you type</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">No Account Needed – Start writing immediately with zero friction</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Secure Cloud Sync – Optional encrypted storage for access across devices</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Device Adaptive UI – Optimized for mobile, tablet, and desktop</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">NLP Structuring – Automatically formats and organizes notes contextually</p>
					</div>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
						<p className="text-gray-600">Privacy by Design – No ads, no tracking, no third-party scripts</p>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="text-center">
				<Link
					href="/"
					className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Try Notepad AI Now
				</Link>
			</section>
		</div>
	);
} 