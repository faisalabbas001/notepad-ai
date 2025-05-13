"use client";

import React, { useEffect, useRef, useState } from "react";
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
	MagnifyingGlassIcon,
	ArrowPathIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import ExportButton from "./ExportButton";
import WordCount from "./WordCount";
import DocumentList from "./DocumentList";
import mammoth from "mammoth";
// Dynamically import ReactQuill only on client side
const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');
		// eslint-disable-next-line react/display-name
		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false }
);

interface Document {
	id: string;
	name: string;
	content: string;
	lastSaved: string;
	highlights?: HighlightPosition[];
}

interface HighlightPosition {
	index: number;
	length: number;
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
	const [showFindReplace, setShowFindReplace] = useState(false);
	const [findText, setFindText] = useState("");
	const [replaceText, setReplaceText] = useState("");
	const [findResults, setFindResults] = useState<number[]>([]);
	const [currentFindIndex, setCurrentFindIndex] = useState(-1);
	const [isSearching, setIsSearching] = useState(false);
	const [searchText, setSearchText] = useState("");
	const quillRef = useRef<any>(null);
	const findInputRef = useRef<HTMLInputElement>(null);
	const [highlightPositions, setHighlightPositions] = useState<HighlightPosition[]>([]);

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

	const applyHighlights = (positions: HighlightPosition[]) => {
		if (!quillRef.current || !showFindReplace) return; // Only apply if search is open
		const quill = quillRef.current.getEditor();
		
		// Clear existing highlights first
		const delta = quill.getContents();
		delta.ops = delta.ops.map((op: any) => {
			if (op.attributes) {
				delete op.attributes['background'];
				delete op.attributes['class'];
			}
			return op;
		});
		quill.setContents(delta, 'silent');

		// Apply new highlights
		positions.forEach((pos, i) => {
			quill.formatText(pos.index, pos.length, {
				'background': i === currentFindIndex ? '#ffc107' : '#ffeb3b'
			}, 'silent');
		});
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
				setHighlightPositions(lastDoc.highlights || []);
				
				// Clear any existing highlights on load
				if (quillRef.current) {
					const quill = quillRef.current.getEditor();
					const delta = quill.getContents();
					delta.ops = delta.ops.map((op: any) => {
						if (op.attributes) {
							delete op.attributes['background'];
							delete op.attributes['class'];
						}
						return op;
					});
					quill.setContents(delta, 'silent');
				}
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
			highlights: highlightPositions,
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
				["blockquote", "code-block"]
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
		"code-block"
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

	// Add custom highlight styles
	useEffect(() => {
		if (typeof window === "undefined") return;
		
		const style = document.createElement("style");
		style.innerHTML = `
			.ql-editor .highlight-match {
				background-color: #ffeb3b !important;
			}
			.ql-editor .highlight-current {
				background-color: #ffc107 !important;
			}
		`;
		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// Add custom styles for search button
	useEffect(() => {
		if (typeof window !== "undefined") {
			const style = document.createElement("style");
			style.innerHTML = `
				.ql-search {
					width: 28px;
					height: 24px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
				.ql-search svg {
					width: 18px;
					height: 18px;
				}
				.ql-search:hover {
					color: #06c;
				}
			`;
			document.head.appendChild(style);
			return () => {
				document.head.removeChild(style);
			};
		}
	}, []);

	// Add custom search button to toolbar
	useEffect(() => {
		if (typeof window === "undefined" || !quillRef.current) return;
		
		const toolbar = quillRef.current.getEditor().getModule('toolbar');
		const searchButton = document.createElement('span');
		searchButton.className = 'ql-search';
		searchButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
		</svg>`;
		searchButton.onclick = () => setShowFindReplace(true);
		
		const toolbarContainer = document.querySelector('.ql-toolbar');
		if (toolbarContainer) {
			toolbarContainer.appendChild(searchButton);
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

	// Find and replace functionality
	const handleFind = (searchValue: string = findText) => {
		if (typeof window === "undefined" || !searchValue || !quillRef.current) return;
		
		const quill = quillRef.current.getEditor();
		if (!quill) return;

		const text = quill.getText();
		const results: number[] = [];
		let index = text.indexOf(searchValue);
		
		while (index !== -1) {
			results.push(index);
			index = text.indexOf(searchValue, index + 1);
		}
		
		setFindResults(results);
		setCurrentFindIndex(results.length > 0 ? 0 : -1);
		
		// Store highlight positions
		const positions: HighlightPosition[] = results.map(index => ({
			index,
			length: searchValue.length
		}));
		setHighlightPositions(positions);
		
		// Only apply highlights if search dialog is open
		if (showFindReplace) {
			applyHighlights(positions);
		}
		
		// Then immediately restore focus to find input
		if (findInputRef.current) {
			findInputRef.current.focus();
			const length = findInputRef.current.value.length;
			findInputRef.current.setSelectionRange(length, length);
		}
	};

	// Effect to handle search dialog open/close
	useEffect(() => {
		if (!quillRef.current) return;
		const quill = quillRef.current.getEditor();

		if (showFindReplace) {
			// Show highlights when search is opened
			applyHighlights(highlightPositions);
		} else {
			// Clear highlights when search is closed
			const delta = quill.getContents();
			delta.ops = delta.ops.map((op: any) => {
				if (op.attributes) {
					delete op.attributes['background'];
					delete op.attributes['class'];
				}
				return op;
			});
			quill.setContents(delta, 'silent');
			
			// Reset find state
			setFindText("");
			setReplaceText("");
			setFindResults([]);
			setCurrentFindIndex(-1);
			setHighlightPositions([]);
		}
	}, [showFindReplace]);

	const handleReplace = () => {
		if (!findText || !replaceText || currentFindIndex === -1 || !quillRef.current) return;
		
		const quill = quillRef.current.getEditor();
		if (!quill) return;

		const index = findResults[currentFindIndex];
		
		// Set the selection to the found text
		quill.setSelection(index, findText.length);
		
		// Delete the found text and insert the replacement
		quill.deleteText(index, findText.length);
		quill.insertText(index, replaceText);
		
		// Update content after replace
		setContent(quill.root.innerHTML);
		
		// Recalculate find results
		handleFind();
	};

	const handleReplaceAll = () => {
		if (!findText || !replaceText || !quillRef.current) return;
		
		const quill = quillRef.current.getEditor();
		if (!quill) return;

		// Get all text content
		const text = quill.getText();
		
		// Create a new text with all replacements
		const newText = text.replace(new RegExp(findText, 'g'), replaceText);
		
		// Update the editor content
		quill.setText(newText);
		
		// Update the content state
		setContent(quill.root.innerHTML);
		
		// Reset find results
		setFindResults([]);
		setCurrentFindIndex(-1);
	};

	const handleFindNext = () => {
		if (findResults.length === 0 || !quillRef.current) return;
		
		const nextIndex = (currentFindIndex + 1) % findResults.length;
		setCurrentFindIndex(nextIndex);
		
		// Only update highlights if search is open
		if (showFindReplace) {
			applyHighlights(highlightPositions);
		}
		
		// Then immediately restore focus to find input
		if (findInputRef.current) {
			findInputRef.current.focus();
		}
	};

	const handleFindPrev = () => {
		if (findResults.length === 0 || !quillRef.current) return;
		
		const prevIndex = (currentFindIndex - 1 + findResults.length) % findResults.length;
		setCurrentFindIndex(prevIndex);
		
		// Only update highlights if search is open
		if (showFindReplace) {
			applyHighlights(highlightPositions);
		}
		
		// Then immediately restore focus to find input
		if (findInputRef.current) {
			findInputRef.current.focus();
		}
	};

	// Handle find input changes
	const handleFindInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setFindText(newValue);
		handleFind(newValue); // Pass the current input value directly
	};

	// Add effect to handle find text changes
	useEffect(() => {
		if (!findText) {
			setFindResults([]);
			setCurrentFindIndex(-1);
			// Clear highlights when search is cleared
			if (quillRef.current) {
				const quill = quillRef.current.getEditor();
				const delta = quill.getContents();
				delta.ops = delta.ops.map((op: any) => {
					if (op.attributes && (op.attributes['background'] || op.attributes['class'])) {
						delete op.attributes['background'];
						delete op.attributes['class'];
					}
					return op;
				});
				quill.setContents(delta);
			}
		}
	}, [findText]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				if (e.key === 'f') {
					e.preventDefault();
					setShowFindReplace(true);
				} else if (e.key === 'h') {
					e.preventDefault();
					setShowFindReplace(true);
				} else if (e.key === 'g' && showFindReplace) {
					e.preventDefault();
					handleFindNext();
				}
			} else if (e.key === 'Escape' && showFindReplace) {
				setShowFindReplace(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showFindReplace, findResults, currentFindIndex]);

	return (
		<div className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden mx-0 sm:mx-8 md:mx-12 lg:mx-64 my-2">
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
				</div>
				<div className="flex items-center space-x-2">
					{/* Add Find button */}
					<button
						onClick={() => setShowFindReplace(true)}
						className="hidden sm:inline-flex p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title="Find and Replace"
					>
						<MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
					</button>
					<button
						onClick={createNewDocument}
						className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title="New Document"
					>
						<PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
					</button>
					<button
						onClick={() => fileInputRef.current?.click()}
						className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors"
						title="Open Document"
					>
						<FolderOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
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
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							title="More actions"
						>
							<EllipsisVerticalIcon className="h-4 w-4 text-gray-600" />
						</button>
						{showMobileActions && (
							<div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
								<button
									onClick={() => { setShowMobileActions(false); handlePrint(); }}
									className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									<PrinterIcon className="h-4 w-4 mr-2" /> Print
								</button>
								<button
									onClick={() => { setShowMobileActions(false); /* trigger export logic here */ }}
									className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									<ArrowDownTrayIcon className="h-4 w-4 mr-2" /> Export
								</button>
								<button
									onClick={() => { setShowMobileActions(false); handleFullscreen(); }}
									className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									{isFullscreen ? (
										<ArrowsPointingInIcon className="h-4 w-4 mr-2" />
									) : (
										<ArrowsPointingOutIcon className="h-4 w-4 mr-2" />
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
					{/* Find and Replace Toolbar - Updated for mobile */}
					{showFindReplace && (
						<div className="bg-gray-100 border-b border-gray-200 p-4 flex flex-col gap-4">
							{/* Find section */}
							<div className="flex flex-col gap-2">
								<div className="relative">
									<input
										ref={findInputRef}
										type="text"
										value={findText}
										onChange={handleFindInputChange}
										placeholder="Find..."
										className="w-full px-3 py-2 border rounded-md"
									/>
									{findResults.length > 0 && (
										<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
											{currentFindIndex + 1} of {findResults.length}
										</span>
									)}
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={handleFindPrev}
										className="flex-1 p-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
										title="Find Previous"
									>
										<ChevronLeftIcon className="h-5 w-5" />
									</button>
									<button
										onClick={handleFindNext}
										className="flex-1 p-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
										title="Find Next"
									>
										<ChevronRightIcon className="h-5 w-5" />
									</button>
								</div>
							</div>

							{/* Replace section */}
							<div className="flex flex-col gap-2">
								<input
									type="text"
									value={replaceText}
									onChange={(e) => setReplaceText(e.target.value)}
									placeholder="Replace..."
									className="w-full px-3 py-2 border rounded-md"
								/>
								<div className="flex items-center gap-2">
									<button
										onClick={handleReplace}
										className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
									>
										Replace
									</button>
									<button
										onClick={handleReplaceAll}
										className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
									>
										Replace All
									</button>
								</div>
							</div>

							{/* Close button */}
							<button
								onClick={() => setShowFindReplace(false)}
								className="p-2 hover:bg-gray-200 rounded self-end"
								title="Close"
							>
								<XMarkIcon className="h-5 w-5" />
							</button>
						</div>
					)}
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
										forwardedRef={quillRef}
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
					{/* Mobile search button */}
					<button
						className="fixed bottom-4 right-20 z-50 sm:hidden bg-blue-600 text-white rounded-full p-3 shadow-lg focus:outline-none"
						onClick={() => setShowFindReplace(true)}
						aria-label="Find and Replace"
					>
						<MagnifyingGlassIcon className="h-6 w-6" />
					</button>
					{/* Desktop toolbar/editor as usual */}
					<div className="flex-1 overflow-y-auto">
						<ReactQuill
							forwardedRef={quillRef}
							theme="snow"
							value={content}
							onChange={setContent}
							modules={modules}
							formats={formats}
							className="h-full hidden sm:block"
						/>
					</div>
					<div className="border-t p-4 bg-gray-50">
						<div className="flex items-center justify-between">
							<WordCount content={content} />
							<span className="text-sm text-gray-500">
								Last saved: {lastSaved}
							</span>
						</div>
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
