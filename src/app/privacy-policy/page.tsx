import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy – Notepad AI",
	description: "Learn how Notepad AI protects your privacy with client-side storage, no data collection, and optional encrypted sync.",
	alternates: {
		canonical: "https://www.notepad-ai.online/privacy-policy"
	}
};

export default function PrivacyPolicy() {
	const today = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			{/* Header */}
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Privacy Policy – Notepad AI
				</h1>
				<p className="text-gray-600">Effective Date: {today}</p>
			</section>

			{/* Introduction */}
			<section className="mb-16">
				<p className="text-lg text-gray-600 mb-8">
					At Notepad AI, your privacy is not just respected — it's built into our design. This Privacy Policy explains what data we do and do not collect, 
					how we handle your content, and your rights as a user.
				</p>
			</section>

			{/* Policy Sections */}
			<div className="space-y-12">
				{/* Section 1 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔍</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">1. We Don't Collect Personal Information</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">You do not need to create an account to use Notepad AI.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">We do not collect your name, email, location, or device identifiers.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">We do not track you across sessions or websites.</p>
						</li>
					</ul>
				</section>

				{/* Section 2 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">📄</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">2. Your Notes Stay on Your Device (By Default)</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">All notes are stored locally in your browser via localStorage or IndexedDB.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">We do not upload or store your notes on our servers unless you choose to use optional sync features (if available).</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Closing your browser may delete your notes if you're using session-based storage.</p>
						</li>
					</ul>
				</section>

				{/* Section 3 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🧠</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">3. NLP Happens Client-Side</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Notepad AI uses in-browser Natural Language Processing (NLP).</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Text suggestions, structuring, and language enhancements are all performed locally.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">No note content is sent to external servers or third-party APIs for analysis.</p>
						</li>
					</ul>
				</section>

				{/* Section 4 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🌐</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">4. Optional Cloud Sync (If Available)</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">If cloud sync is enabled in the future:</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Your notes will be encrypted before being sent or stored.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">We will never access or read your content.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">You will retain full control and can disable sync at any time.</p>
						</li>
					</ul>
				</section>

				{/* Section 5 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🍪</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">5. No Cookies or Third-Party Trackers</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">We do not use cookies, analytics scripts, or advertising trackers.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Your behavior is not monitored, profiled, or monetized.</p>
						</li>
					</ul>
				</section>

				{/* Section 6 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🛡️</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">6. Security and Control</h2>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Your data stays in your hands unless you explicitly choose otherwise.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">We do not sell, share, or trade any user data.</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">If sync features are introduced, they will follow strict encryption and opt-in control.</p>
						</li>
					</ul>
				</section>

				{/* Section 7 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">⚖️</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">7. Your Rights</h2>
					<p className="text-gray-600 mb-4">You have the right to:</p>
					<ul className="space-y-3">
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Use our tool anonymously</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Export or delete your notes at any time</p>
						</li>
						<li className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
							<p className="text-gray-600">Contact us with questions at support@notepad-ai.online</p>
						</li>
					</ul>
				</section>

				{/* Section 8 */}
				<section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
					<div className="text-3xl mb-4">🔁</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-600">8. Changes to This Policy</h2>
					<p className="text-gray-600">
						We may update this Privacy Policy to reflect changes in technology or law. All changes will be posted here. 
						Continued use after updates means you agree to the revised policy.
					</p>
				</section>
			</div>

			{/* Contact Section */}
			<section className="mt-16 text-center">
				<h2 className="text-2xl font-bold mb-4 text-blue-600">Contact Us</h2>
				<p className="text-gray-600 mb-2">Email: support@notepad-ai.online</p>
				<p className="text-gray-600">Website: <Link href="https://www.notepad-ai.online" className="text-blue-600 hover:underline">https://www.notepad-ai.online</Link></p>
			</section>
		</div>
	);
} 