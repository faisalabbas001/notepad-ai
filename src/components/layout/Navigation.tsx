"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-start h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex justify-center items-center h-16 w-full">
							<img src="/logo.png" alt="Logo" className="h-12 w-12 md:h-20 md:w-20 lg:h-32 lg:w-32 object-contain" />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{/* {isMenuOpen && (
				<div className="sm:hidden">
					<div className="pt-2 pb-3 space-y-1">
						<button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
							New Document
						</button>
						<button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
							Open
						</button>
						<button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
							Save
						</button>
						<button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
							Export
						</button>
					</div>
				</div>
			)} */}
		</nav>
	);
}
