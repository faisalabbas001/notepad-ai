"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/app/editor.css";
import {
	ArrowsPointingOutIcon,
	ArrowsPointingInIcon,
	PencilIcon,
	CheckIcon,
	PlusIcon,
	FolderOpenIcon,
	PrinterIcon,
	DocumentIcon,
	TrashIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	EllipsisVerticalIcon,
	ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import ExportButton from "./ExportButton";
import WordCount from "./WordCount";
import DocumentList from "./DocumentList";
import Quill from "quill";
import mammoth from "mammoth";

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading editor...</p>,
});

interface Document {
	id: string;
	name: string;
	content: string;
	lastSaved: string;
}

export default function Editor() {
	const [isEditingName, setIsEditingName] = useState(false);
	const [documentName, setDocumentName] = useState("Untitled Document");
	const [content, setContent] = useState("");
	const [lastSaved, setLastSaved] = useState("");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [documents, setDocuments] = useState<Document[]>([]);
	const [currentDocId, setCurrentDocId] = useState<string>("");
	const editorRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
	const [showMobileSidebar, setShowMobileSidebar] = useState(false);
	const [showMobileActions, setShowMobileActions] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [showMobileToolbar, setShowMobileToolbar] = useState(false);

	// Function to generate unique ID
	const generateUniqueId = () => {
		if (typeof crypto !== "undefined" && crypto.randomUUID) {
			return crypto.randomUUID();
		}
		// Fallback for browsers that don't support crypto.randomUUID
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				const r = (Math.random() * 16) | 0;
				const v = c === "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	};

	// Load documents from localStorage on component mount
	useEffect(() => {
		const savedDocs = localStorage.getItem("documents");
		if (savedDocs) {
			const docs = JSON.parse(savedDocs);
			setDocuments(docs);
			if (docs.length > 0) {
				const lastDoc = docs[docs.length - 1];
				setCurrentDocId(lastDoc.id);
				setDocumentName(lastDoc.name);
				setContent(lastDoc.content);
				setLastSaved(lastDoc.lastSaved);
			}
		}
	}, []);

	// Save current document to documents list
	const saveCurrentDocument = () => {
		const docData: Document = {
			id: currentDocId || generateUniqueId(),
			name: documentName,
			content,
			lastSaved: new Date().toLocaleString(),
		};

		const updatedDocs = documents.filter((doc) => doc.id !== currentDocId);
		updatedDocs.push(docData);
		setDocuments(updatedDocs);
		localStorage.setItem("documents", JSON.stringify(updatedDocs));
		setCurrentDocId(docData.id);
		setLastSaved(docData.lastSaved);
	};

	// Create new document
	const createNewDocument = () => {
		// Save current document first
		if (content.trim() || documentName !== "Untitled Document") {
			saveCurrentDocument();
		}

		// Reset editor state
		setCurrentDocId("");
		setDocumentName("Untitled Document");
		setContent("");
		setLastSaved("");
	};

	// Select a document
	const handleSelectDocument = (doc: Document) => {
		// Save current document first
		if (content.trim() || documentName !== "Untitled Document") {
			saveCurrentDocument();
		}

		// Load selected document
		setCurrentDocId(doc.id);
		setDocumentName(doc.name);
		setContent(doc.content);
		setLastSaved(doc.lastSaved);
	};

	// Delete a document
	const handleDeleteDocument = (id: string) => {
		const updatedDocs = documents.filter((doc) => doc.id !== id);
		setDocuments(updatedDocs);
		localStorage.setItem("documents", JSON.stringify(updatedDocs));

		// If deleted document was current, create new document
		if (id === currentDocId) {
			createNewDocument();
		}
	};

	// Auto-save when content or name changes
	useEffect(() => {
		const timeoutId = setTimeout(saveCurrentDocument, 1000);
		return () => clearTimeout(timeoutId);
	}, [content, documentName]);

	const handleFullscreen = () => {
		if (!document.fullscreenElement) {
			editorRef.current?.requestFullscreen();
			setIsFullscreen(true);
		} else {
			document.exitFullscreen();
			setIsFullscreen(false);
		}
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ size: ["small", "normal", "large", "huge"] }],
				["bold", "italic", "underline", "strike"],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ indent: "-1" }, { indent: "+1" }],
				[{ align: [] }],
				["link", "image"],
				["clean"],
				[{ color: [] }, { background: [] }],
				[{ font: [] }],
				[{ script: "sub" }, { script: "super" }],
				["blockquote", "code-block"],
			],
		},
	};

	const formats = [
		"header",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"align",
		"color",
		"background",
		"font",
		"script",
		"blockquote",
		"code-block",
	];

	// Add custom font size styles
	useEffect(() => {
		if (typeof window !== "undefined") {
			const style = document.createElement("style");
			style.innerHTML = `
				.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
				.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
					content: '8px';
				}
				.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="normal"]::before,
				.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="normal"]::before {
					content: '14px';
				}
				.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
				.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
					content: '24px';
				}
				.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
				.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
					content: '32px';
				}
				.ql-snow .ql-picker.ql-size .ql-picker-label::before,
				.ql-snow .ql-picker.ql-size .ql-picker-item::before {
					content: 'Normal';
				}
				.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=""]::before,
				.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=""]::before {
					content: 'Normal';
				}
				.ql-editor .ql-size-small { font-size: 8px !important; }
				.ql-editor .ql-size-normal { font-size: 14px !important; }
				.ql-editor .ql-size-large { font-size: 24px !important; }
				.ql-editor .ql-size-huge { font-size: 32px !important; }
			`;
			document.head.appendChild(style);
			return () => {
				document.head.removeChild(style);
			};
		}
	}, []);

	const handleFileOpen = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			let content = "";
			const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension

			if (file.type === "text/plain") {
				// Handle .txt files
				content = await new Promise((resolve) => {
					const reader = new FileReader();
					reader.onload = (e) => resolve(e.target?.result as string);
					reader.readAsText(file);
				});
			} else if (
				file.type ===
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			) {
				// Handle .docx files
				const arrayBuffer = await file.arrayBuffer();
				const result = await mammoth.convertToHtml({ arrayBuffer });
				content = result.value;
			} else {
				alert("Please select a .txt or .docx file.");
				return;
			}

			setContent(content);
			setDocumentName(fileName);
			setLastSaved(new Date().toLocaleString());
		} catch (error) {
			console.error("Error reading file:", error);
			alert("Error reading file. Please try again.");
		}
	};

	const handlePrint = () => {
		const printWindow = window.open("", "_blank");
		if (!printWindow) return;

		const printContent = `
			<!DOCTYPE html>
			<html>
				<head>
					<title>${documentName}</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							line-height: 1.6;
							padding: 20px;
							max-width: 800px;
							margin: 0 auto;
						}
						@media print {
							body {
								padding: 0;
							}
						}
					</style>
				</head>
				<body>
					${content}
				</body>
			</html>
		`;

		printWindow.document.write(printContent);
		printWindow.document.close();
		printWindow.focus();

		// Wait for content to load
		setTimeout(() => {
			printWindow.print();
			printWindow.close();
		}, 250);
	};

	useEffect(() => {
		if (!showMobileActions) return;
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowMobileActions(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [showMobileActions]);

	return (
		<div className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden mx-12 sm:mx-8 md:mx-12 lg:mx-64 my-2">
			<div className="flex items-center justify-between p-4 sm:p-6 border-b bg-white">
				<div className="flex items-center space-x-4 sm:space-x-6">
					{isEditingName ? (
						<input
							type="text"
							value={documentName}
							onChange={(e) => setDocumentName(e.target.value)}
							onBlur={() => setIsEditingName(false)}
							className="text-xl font-semibold border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							autoFocus
						/>
					) : (
						<h1
							className="text-xl font-semibold cursor-pointer hover:text-gray-600 transition-colors"
							onClick={() => setIsEditingName(true)}
						>
							{documentName}
						</h1>
					)}
					<span className="text-sm text-gray-500">
						Last saved: {lastSaved}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={createNewDocument}
						className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title="New Document"
					>
						<PlusIcon className="h-5 w-5 text-gray-600" />
					</button>
					<button
						onClick={() => fileInputRef.current?.click()}
						className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title="Open Document"
					>
						<FolderOpenIcon className="h-5 w-5 text-gray-600" />
					</button>
					{/* Desktop only actions */}
					<button
						onClick={handlePrint}
						className="hidden sm:inline-flex p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title="Print"
					>
						<PrinterIcon className="h-5 w-5 text-gray-600" />
					</button>
					<span className="hidden sm:inline-flex">
						<ExportButton content={content} documentName={documentName} />
					</span>
					<button
						onClick={handleFullscreen}
						className="hidden sm:inline-flex p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
					>
						{isFullscreen ? (
							<ArrowsPointingInIcon className="h-5 w-5 text-gray-600" />
						) : (
							<ArrowsPointingOutIcon className="h-5 w-5 text-gray-600" />
						)}
					</button>
					{/* Mobile dropdown for actions */}
					<div className="relative sm:hidden">
						<button
							onClick={() => setShowMobileActions((v) => !v)}
							className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
							title="More actions"
						>
							<EllipsisVerticalIcon className="h-6 w-6 text-gray-600" />
						</button>
						{showMobileActions && (
							<div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
								<button
									onClick={() => { setShowMobileActions(false); handlePrint(); }}
									className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									<PrinterIcon className="h-5 w-5 mr-2" /> Print
								</button>
								<button
									onClick={() => { setShowMobileActions(false); /* trigger export logic here */ }}
									className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									<ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Export
								</button>
								<button
									onClick={() => { setShowMobileActions(false); handleFullscreen(); }}
									className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									{isFullscreen ? (
										<ArrowsPointingInIcon className="h-5 w-5 mr-2" />
									) : (
										<ArrowsPointingOutIcon className="h-5 w-5 mr-2" />
									)}
									{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-1 overflow-hidden">
				{/* Desktop sidebar */}
				<div className="hidden sm:block">
					<DocumentList
						documents={documents}
						onSelectDocument={handleSelectDocument}
						onDeleteDocument={handleDeleteDocument}
						onNewDocument={createNewDocument}
						isExpanded={isSidebarExpanded}
						setIsExpanded={setIsSidebarExpanded}
					/>
				</div>
				{/* Mobile sidebar overlay */}
				{showMobileSidebar && (
					<div className="fixed inset-0 z-40 flex">
						<div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowMobileSidebar(false)} />
						<div className="relative z-50 w-64 max-w-full h-full bg-white shadow-xl transition-transform duration-300">
							<DocumentList
								documents={documents}
								onSelectDocument={(doc) => { setShowMobileSidebar(false); handleSelectDocument(doc); }}
								onDeleteDocument={handleDeleteDocument}
								onNewDocument={() => { setShowMobileSidebar(false); createNewDocument(); }}
								isExpanded={true}
								setIsExpanded={() => {}}
							/>
						</div>
					</div>
				)}
				{/* Mobile sidebar toggle button */}
				<button
					className="fixed bottom-4 left-4 z-50 sm:hidden bg-blue-600 text-white rounded-full p-3 shadow-lg focus:outline-none"
					onClick={() => setShowMobileSidebar(true)}
					aria-label="Open documents sidebar"
				>
					<DocumentIcon className="h-6 w-6" />
				</button>
				{/* Editor area always flex-1 */}
				<div className="flex-1 flex flex-col overflow-hidden" ref={editorRef}>
					{/* Mobile toolbar button */}
					<button
						className="fixed bottom-4 right-4 z-50 sm:hidden bg-blue-600 text-white rounded-full p-3 shadow-lg focus:outline-none"
						onClick={() => setShowMobileToolbar(true)}
						aria-label="Show editor toolbar"
					>
						<EllipsisVerticalIcon className="h-6 w-6" />
					</button>
					{/* Mobile toolbar modal */}
					{showMobileToolbar && (
						<div className="fixed inset-0 z-50 flex items-end sm:hidden">
							<div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowMobileToolbar(false)} />
							<div className="relative w-full bg-white rounded-t-2xl shadow-lg p-4 max-h-[60vh] overflow-y-auto">
								<div className="flex flex-wrap gap-2 justify-center">
									{/* Render the Quill toolbar here for mobile */}
									<ReactQuill
										theme="snow"
										value={content}
										onChange={setContent}
										modules={modules}
										formats={formats}
										className="h-full"
										readOnly={false}
									/>
								</div>
								<button
									className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
									onClick={() => setShowMobileToolbar(false)}
								>
									Done
								</button>
							</div>
						</div>
					)}
					{/* Desktop toolbar/editor as usual */}
					<div className="flex-1 overflow-y-auto">
						<ReactQuill
							theme="snow"
							value={content}
							onChange={setContent}
							modules={modules}
							formats={formats}
							className="h-full hidden sm:block"
						/>
					</div>
					<div className="border-t p-4 bg-gray-50">
						<WordCount content={content} />
					</div>
				</div>
			</div>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileOpen}
				accept=".docx,.doc"
				className="hidden"
			/>
		</div>
	);
}
