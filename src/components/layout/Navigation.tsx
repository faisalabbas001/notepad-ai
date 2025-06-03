"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
	HomeIcon, 
	DocumentTextIcon, 
	BookOpenIcon,
	Bars3Icon,
	XMarkIcon
} from "@heroicons/react/24/outline";

export default function Navigation() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setMobileMenuOpen(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<div ref={navRef}>
			<nav className={`fixed top-0 left-0 right-0 z-50 ${
				scrolled ? 'bg-[#1a1f2e]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
			}`}>
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex-shrink-0 flex items-center">
							<Link href="/" className="flex items-center gap-2">
								<img 
									src="/logo.png" 
									alt="NotepadAI" 
									className="h-14 w-14" 
								/>
								<span className="text-[#4d9fff] text-xl font-semibold">
									NotepadAI
								</span>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-8">
							<Link href="/" className="text-gray-300 hover:text-[#4d9fff]">
								Home
							</Link>
							<Link href="/features" className="text-gray-300 hover:text-[#4d9fff]">
								Features
							</Link>
							<Link href="/docs" className="text-gray-300 hover:text-[#4d9fff]">
								Docs
							</Link>
							<Link href="/about-us" className="text-gray-300 hover:text-[#4d9fff]">
								About
							</Link>
							<button className="bg-[#4d9fff] text-white px-4 py-2 rounded-lg hover:bg-[#60a5fa] transition-colors">
								Get Started →
							</button>
						</div>

						{/* Mobile Menu Button */}
						<button
							className="md:hidden p-2 text-gray-300 hover:text-[#4d9fff]"
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							{mobileMenuOpen ? (
								<XMarkIcon className="h-6 w-6" />
							) : (
								<Bars3Icon className="h-6 w-6" />
							)}
						</button>
					</div>

					{/* Mobile Menu */}
					<div
						className={`md:hidden absolute left-0 right-0 bg-[#1a1f2e] shadow-lg transition-all duration-300 ease-in-out ${
							mobileMenuOpen 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 -translate-y-full pointer-events-none'
						}`}
					>
						<div className="px-4 py-3 space-y-3">
							<Link
								href="/"
								className="block text-gray-300 hover:text-[#4d9fff] py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								href="/features"
								className="block text-gray-300 hover:text-[#4d9fff] py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Features
							</Link>
							<Link
								href="/docs"
								className="block text-gray-300 hover:text-[#4d9fff] py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Docs
							</Link>
							<Link
								href="/about"
								className="block text-gray-300 hover:text-[#4d9fff] py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								About
							</Link>
							<div className="pt-2 pb-3">
								<button
									className="w-full bg-[#4d9fff] text-white px-4 py-2 rounded-lg hover:bg-[#60a5fa] transition-colors"
									onClick={() => setMobileMenuOpen(false)}
								>
									Get Started →
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Overlay for mobile menu */}
			{mobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 md:hidden z-40"
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}
		</div>
	);
}
