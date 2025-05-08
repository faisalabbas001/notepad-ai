import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import {
	Document,
	Packer,
	Paragraph,
	TextRun,
	HeadingLevel,
	AlignmentType,
	LevelFormat,
	UnderlineType,
} from "docx";
import html2canvas from "html2canvas";

interface ExportButtonProps {
	content: string;
	documentName: string;
}

export default function ExportButton({
	content,
	documentName,
}: ExportButtonProps) {
	const getFileName = (extension: string) => {
		// If document name is empty or "Untitled Document", use current date and time
		if (!documentName || documentName === "Untitled Document") {
			const now = new Date();
			const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
			const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS
			return `Document-${dateStr}-${timeStr}.${extension}`;
		}
		return `${documentName}.${extension}`;
	};

	const exportAsPDF = async () => {
		// Create a temporary div to render the HTML content
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = content;
		tempDiv.style.width = "800px"; // Set a fixed width for better rendering
		tempDiv.style.padding = "20px";
		document.body.appendChild(tempDiv);

		try {
			// Convert HTML to canvas
			const canvas = await html2canvas(tempDiv, {
				scale: 2, // Higher scale for better quality
				useCORS: true,
				logging: false,
			});

			// Create PDF with proper dimensions
			const imgWidth = 210; // A4 width in mm
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			const pdf = new jsPDF("p", "mm", "a4");

			// Add the image to PDF
			pdf.addImage(
				canvas.toDataURL("image/png"),
				"PNG",
				0,
				0,
				imgWidth,
				imgHeight
			);
			pdf.save(getFileName("pdf"));
		} finally {
			// Clean up
			document.body.removeChild(tempDiv);
		}
	};

	const getTextRuns = (element: HTMLElement): TextRun[] => {
		const runs: TextRun[] = [];
		const walker = document.createTreeWalker(
			element,
			NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
			null
		);

		let node: Node | null = walker.nextNode();
		while (node) {
			if (node.nodeType === Node.TEXT_NODE) {
				const text = node.textContent || "";
				if (text.trim()) {
					const parent = node.parentElement;
					if (parent) {
						const style = window.getComputedStyle(parent);
						const isSubscript =
							parent.tagName.toLowerCase() === "sub" ||
							style.verticalAlign === "sub";
						const isSuperscript =
							parent.tagName.toLowerCase() === "sup" ||
							style.verticalAlign === "super";

						runs.push(
							new TextRun({
								text,
								bold: style.fontWeight === "bold" || style.fontWeight === "700",
								italics: style.fontStyle === "italic",
								underline: {
									type: style.textDecoration.includes("underline")
										? "single"
										: "none",
								},
								color: style.color !== "rgb(0, 0, 0)" ? style.color : undefined,
								highlight:
									style.backgroundColor !== "rgba(0, 0, 0, 0)"
										? style.backgroundColor
										: undefined,
								size: parseInt(style.fontSize) * 2, // Convert px to half-points
								font: style.fontFamily.split(",")[0].replace(/['"]/g, ""),
								subScript: isSubscript,
								superScript: isSuperscript,
							})
						);
					}
				}
			}
			node = walker.nextNode();
		}

		return runs;
	};

	const exportAsDocx = async () => {
		// Create a temporary div to parse HTML content
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = content;
		document.body.appendChild(tempDiv);

		try {
			// Convert HTML elements to docx elements
			const docChildren = Array.from(tempDiv.childNodes)
				.map((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const element = node as HTMLElement;
						const style = window.getComputedStyle(element);

						// Handle headings
						if (element.tagName.match(/^H[1-6]$/)) {
							const level = parseInt(element.tagName[1]);
							const headingLevel = `Heading${level}` as
								| "Heading1"
								| "Heading2"
								| "Heading3"
								| "Heading4"
								| "Heading5"
								| "Heading6";
							return new Paragraph({
								children: getTextRuns(element),
								heading: headingLevel,
								spacing: { after: 200 },
								alignment:
									style.textAlign === "center"
										? "center"
										: style.textAlign === "right"
										? "right"
										: style.textAlign === "justify"
										? "both"
										: "left",
							});
						}

						// Handle paragraphs
						if (element.tagName === "P") {
							return new Paragraph({
								children: getTextRuns(element),
								spacing: { after: 200 },
								alignment:
									style.textAlign === "center"
										? "center"
										: style.textAlign === "right"
										? "right"
										: style.textAlign === "justify"
										? "both"
										: "left",
							});
						}

						// Handle lists
						if (element.tagName === "UL" || element.tagName === "OL") {
							return new Paragraph({
								children: getTextRuns(element),
								spacing: { after: 200 },
								numbering: {
									level: 0,
									reference: element.tagName === "UL" ? "bullet" : "number",
								},
							});
						}

						// Handle blockquotes
						if (element.tagName === "BLOCKQUOTE") {
							return new Paragraph({
								children: getTextRuns(element),
								spacing: { before: 200, after: 200 },
								indent: { left: 400 },
								border: {
									left: { style: "single", size: 4, color: "CCCCCC" },
								},
							});
						}

						// Handle code blocks
						if (element.tagName === "PRE") {
							return new Paragraph({
								children: getTextRuns(element),
								spacing: { before: 200, after: 200 },
								indent: { left: 400 },
								border: {
									left: { style: "single", size: 4, color: "CCCCCC" },
								},
							});
						}
					}

					// Default text run for other content
					if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
						return new Paragraph({
							children: [
								new TextRun({
									text: node.textContent,
								}),
							],
							spacing: { after: 200 },
						});
					}
					return null;
				})
				.filter((node): node is Paragraph => node !== null);

			// Create document
			const doc = new Document({
				sections: [
					{
						properties: {},
						children: docChildren,
					},
				],
			});

			// Generate and save the document
			const blob = await Packer.toBlob(doc);
			saveAs(blob, getFileName("docx"));
		} finally {
			// Clean up
			document.body.removeChild(tempDiv);
		}
	};

	const exportAsText = () => {
		const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
		const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
		saveAs(blob, getFileName("txt"));
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					<ArrowDownTrayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
					Export
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={exportAsPDF}
									className={`${
										active ? "bg-gray-100 text-gray-900" : "text-gray-700"
									} block w-full px-4 py-2 text-left text-sm`}
								>
									Export as PDF
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={exportAsDocx}
									className={`${
										active ? "bg-gray-100 text-gray-900" : "text-gray-700"
									} block w-full px-4 py-2 text-left text-sm`}
								>
									Export as DOCX
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={exportAsText}
									className={`${
										active ? "bg-gray-100 text-gray-900" : "text-gray-700"
									} block w-full px-4 py-2 text-left text-sm`}
								>
									Export as TXT
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
