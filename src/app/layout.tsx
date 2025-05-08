import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Notepad Web App",
	description: "A modern, SEO-optimized online notepad built with Next.js",
	keywords: "notepad, text editor, online editor, document editor",
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/icon.png', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-icon.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable}`}>
			<body className="min-h-full bg-gray-50">
				<div className="min-h-full">
					<Navigation />
					<main className="h-[calc(100vh-4rem)]">
						<div className="h-full px-8 lg:px-12 py-6">
							{children}
						</div>
					</main>
				</div>
			</body>
		</html>
	);
}
