import React from "react";

interface WordCountProps {
	content: string;
}

export default function WordCount({ content }: WordCountProps) {
	// Remove HTML tags and count words
	const textContent = content.replace(/<[^>]*>/g, "");
	const wordCount = textContent
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
	const charCount = textContent.length;

	return (
		<div className="flex items-center gap-4 text-sm text-gray-500">
			<span>{wordCount} words</span>
			<span>{charCount} characters</span>
		</div>
	);
}
