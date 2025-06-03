import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Script from "next/script";
import Footer from "@/components/Footer";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Free Online Notepad for Quick Notes – Secure, Simple & Fast",
	description: "Take notes online with our free notepad. No sign-up, autosave enabled, fast and private. Perfect for writing, editing, and storing notes on the go.",
	keywords: "online notepad, notepad online, notes online, write notes online, free online notepad, notepad AI, free online notepad with save feature, online notepad without login, secure AI-powered notepad online, AI note-taking tool, online notepad that auto saves, AI notepad for daily notes, fast online notepad for writing, minimal notepad web app, lightweight online notepad tool, AI writing assistant, smart note editor, online text editor with AI, GPT-powered notepad, intelligent online notebook, machine learning note app, context-aware note taking, Notepad AI online, notepad-ai.online, notepad-ai tool, notepad AI web app",
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/icon.png', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-icon.png',
	},
	alternates: {
		canonical: "https://www.notepad-ai.online/"
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable}`}>
			<head>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
					`}
				</Script>
			</head>
			<body className="min-h-full relative">
				{/* Enhanced animated background */}
				<div className="fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
					{/* Glowing orbs */}
					<div className="glow-orb top-[10%] left-[20%]"></div>
					<div className="glow-orb bottom-[30%] right-[10%]"></div>
					<div className="glow-orb top-[40%] right-[30%]"></div>

					{/* Enhanced floating particles */}
					<div className="particles-container">
						{[...Array(100)].map((_, i) => (
							<div
								key={i}
								className={`particle particle-${i % 5}`}
								style={{
									'--x': `${Math.random() * 100}%`,
									'--y': `${Math.random() * 100}%`,
									'--delay': `${Math.random() * 10}s`,
									'--size': `${Math.random() * 3 + 1}px`,
								} as any}
							/>
						))}
					</div>

					{/* Neural network lines */}
					<div className="neural-lines">
						{[...Array(15)].map((_, i) => (
							<div
								key={i}
								className="neural-line"
								style={{
									'--rotation': `${Math.random() * 360}deg`,
									'--delay': `${Math.random() * 5}s`,
								} as any}
							/>
						))}
					</div>

					{/* Enhanced AI processing circles */}
					<div className="processing-circles">
						<div className="circle circle-1"></div>
						<div className="circle circle-2"></div>
						<div className="circle circle-3"></div>
					</div>

					{/* Gradient mesh background */}
					<div className="gradient-mesh"></div>

					{/* Animated grid overlay */}
					<div className="grid-overlay"></div>

					{/* Final overlay for better content contrast */}
					<div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/80" />
				</div>

				{/* Main content */}
				<div className="relative z-10 flex flex-col min-h-screen">
					<Navigation />
					<main className="h-[calc(100vh-4rem)]">
						<div className="h-full px-8 lg:px-12 py-6 backdrop-blur-[3px]">
							{children}
							<Footer />
						</div>
					</main>
				</div>
			</body>
		</html>
	);
}
