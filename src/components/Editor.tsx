"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/app/editor.css";
import {
	ArrowsPointingOutIcon,
	ArrowsPointingInIcon,
	// PencilIcon,
	// CheckIcon,
	PlusIcon,
	FolderOpenIcon,
	PrinterIcon,
	// DocumentIcon,
	TrashIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	// EllipsisVerticalIcon,
	// ArrowDownTrayIcon,
	MagnifyingGlassIcon,
	XMarkIcon,
	// Bars3Icon,
	DocumentTextIcon,
	ViewColumnsIcon,
	// QuestionMarkCircleIcon,
	// ExclamationCircleIcon,
	// Switch,
	ClipboardIcon
} from "@heroicons/react/24/outline";
import ExportButton from "./ExportButton";
import WordCount from "./WordCount";
import DocumentList from "./DocumentList";
import mammoth from "mammoth";
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { docsStorage } from "@/utils/docsStorage";
// import { Switch as HeadlessUISwitch } from '@headlessui/react';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';
import SaveModal from './SaveModel';
import ShareModal from './ShareModel';
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

interface EditorProps {
	initialContent?: string;
	isSharedNote?: boolean;
	allowEditing?: boolean;
	sharedTitle?: string;
	onSave?: (content: string) => void;
}

export default function Editor({ 
	initialContent,
	isSharedNote = false,
	allowEditing = true,
	sharedTitle,
	onSave
}: EditorProps) {
	const [isEditingName, setIsEditingName] = useState(false);
	const [documentName, setDocumentName] = useState("Untitled Document");
	const [content, setContent] = useState("");
	const [lastSaved, setLastSaved] = useState("");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [documents, setDocuments] = useState<Document[]>([]);
	const [currentDocId, setCurrentDocId] = useState<string>(uuidv4());
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
	const searchParams = useSearchParams();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [autoExpire, setAutoExpire] = useState(true);
	const [expireDays, setExpireDays] = useState("7");
	const [passwordProtect, setPasswordProtect] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSaved, setIsSaved] = useState(false);
	const [shareUrl, setShareUrl] = useState("");
	const [currentShareId, setCurrentShareId] = useState<string | null>(null);

	// Initialize content from props if provided
	useEffect(() => {
		if (isSharedNote && initialContent) {
			setContent(initialContent);
			if (sharedTitle) {
				setDocumentName(sharedTitle);
			}
		}
	}, [initialContent, isSharedNote, sharedTitle]);



	// Modify auto-save functionality to handle both cases
	useEffect(() => {
		if (isSharedNote) {
			// For shared notes, use the provided onSave callback
			if (onSave) {
				const saveTimeout = setTimeout(() => {
					onSave(content);
				}, 1000);
				return () => clearTimeout(saveTimeout);
			}
		} else {
			// Original auto-save functionality for regular notes
			const autoSave = () => {
				const currentDate = new Date().toISOString();
				const doc = {
					id: currentDocId,
					title: documentName,
					content: content,
					lastModified: currentDate
				};
				
				docsStorage.saveDoc(doc);
				setLastSaved(currentDate);
			};

			const saveTimeout = setTimeout(autoSave, 1000);
			return () => clearTimeout(saveTimeout);
		}
	}, [content, documentName, currentDocId, isSharedNote, onSave]);

	// Load document if docId is in URL
	useEffect(() => {
		const docId = searchParams.get('doc');
		if (docId) {
			const doc = docsStorage.getDoc(docId);
			if (doc) {
				setContent(doc.content);
				setDocumentName(doc.title);
				setLastSaved(doc.lastModified);
				setCurrentDocId(doc.id);
			}
		}
	}, [searchParams]);

	// Create new document function
	const createNewDocument = () => {
		const newId = uuidv4();
		setCurrentDocId(newId);
		setContent("");
		setDocumentName("Untitled Document");
		setLastSaved(new Date().toISOString());
		// Update URL without docId
		window.history.pushState({}, '', '/');
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
			id: currentDocId || uuidv4(),
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
			// Apply highlights using Quill's format
			const quill = quillRef.current?.getEditor();
			if (quill) {
				positions.forEach(pos => {
					quill.formatText(pos.index, pos.length, {
						background: '#ffeb3b',
						class: 'highlight'
					}, 'silent');
				});
			}
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
			const delta = quill.getContents();
			delta.ops = delta.ops.map((op: any) => {
				if (op.attributes) {
					op.attributes['background'] = '#ffeb3b';
					op.attributes['class'] = 'highlight';
				}
				return op;
			});
			quill.setContents(delta, 'silent');
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
			// Apply highlights to the current find result
			const quill = quillRef.current?.getEditor();
			if (quill && findResults.length > 0) {
				const index = findResults[currentFindIndex];
				quill.setSelection(index, findText.length);
			}
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
			// Apply highlights to the current find result
			const quill = quillRef.current?.getEditor();
			if (quill && findResults.length > 0) {
				const index = findResults[currentFindIndex];
				quill.setSelection(index, findText.length);
			}
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

	// Load all documents
	useEffect(() => {
		const loadDocs = () => {
			const allDocs = docsStorage.getAllDocs();
			setDocuments(allDocs.map(doc => ({
				...doc,
				name: doc.title,
				lastSaved: doc.lastModified
			})).sort((a, b) => 
				new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
			));
		};
		loadDocs();
	}, [lastSaved]);

	// Handle click outside sidebar
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Load document function
	const loadDocument = (doc: { content: string; title: string; lastModified: string; id: string }) => {
		setContent(doc.content);
		setDocumentName(doc.title);
		setLastSaved(doc.lastModified);
		setCurrentDocId(doc.id);
		setIsSidebarOpen(false);
	};

	// Add delete document function
	const handleDeleteDoc = (docId: string, e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent document selection when clicking delete
		
		if (confirm('Are you sure you want to delete this document?')) {
			docsStorage.deleteDoc(docId);
			setDocuments(prev => prev.filter(doc => doc.id !== docId));
			
			// If current document is deleted, create new one
			if (docId === currentDocId) {
				setContent("");
				setDocumentName("Untitled Document");
				setCurrentDocId(uuidv4());
				setLastSaved(new Date().toISOString());
			}
		}
	};

	// Add this function to handle successful save
	const handleSaveSuccess = (shareId: string) => {
		setCurrentShareId(shareId);
    setIsSaved(true);
    setShowSaveModal(false);
		
		// Adjust confetti position to top
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.25 }, // Changed from 0.6 to 0.25 to show at top
			gravity: 1.5 // Added gravity to make it fall naturally
		});
	};

	// Update the save/share button
	const saveButton = (
		<button
		  onClick={() => {
			if (isSaved) {
			  // Generate share URL when opening share modal
			  const shareId = currentDocId;
			  setShareUrl(`${window.location.origin}/note/${shareId}`);
			  setShowShareModal(true);
			} else {
			  setShowSaveModal(true);
			}
		  }}
		  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
		>
		  {isSaved ? "Share" : "Save"}
		</button>
	  );
	// Add animation styles
	useEffect(() => {
		if (typeof window !== "undefined") {
			const style = document.createElement("style");
			style.innerHTML = `
				@keyframes fade-in {
					from { opacity: 0; transform: scale(0.95); }
					to { opacity: 1; transform: scale(1); }
				}
				.animate-fade-in {
					animation: fade-in 0.2s ease-out;
				}
			`;
			document.head.appendChild(style);
			return () => {
				document.head.removeChild(style);
			};
		}
	}, []);

	return (
		<>
			<div className={`flex flex-col main-container  h-[calc(100vh-72px)] min-h-0 bg-[#1a1f2e]/90 backdrop-blur-sm rounded-lg overflow-hidden mb-12 border border-[#2a3142] shadow-2xl ${
				(showSaveModal || showShareModal) ? 'blur-md ' : ''
			}`}>
				{/* Header section */}
				<div className="flex items-center justify-between flex-wrap gap-2 p-3 sm:p-4 md:p-6 border-b border-[#2a3142] bg-[#1a1f2e] ">
  <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
    {/* Sidebar button */}
    {!isSharedNote && (
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="group relative p-1 sm:p-2 hover:bg-[#151823] rounded-lg text-gray-400 hover:text-[#4d9fff] transition-colors"
      >
        <ViewColumnsIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#151823] text-xs text-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Notes
        </span>
      </button>
    )}

    {/* Document title */}
    {isEditingName && allowEditing ? (
      <input
        type="text"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        onBlur={() => setIsEditingName(false)}
        className="text-lg sm:text-xl font-semibold bg-[#151823] text-gray-100 rounded px-2 sm:px-4 py-1 sm:py-2 w-full sm:w-auto"
        autoFocus
      />
    ) : (
      <h1
        className={`text-lg sm:text-xl font-semibold ${
          allowEditing ? "cursor-pointer hover:text-[#4d9fff]" : ""
        } text-gray-100 truncate max-w-[120px] sm:max-w-[150px] md:max-w-none`}
        onClick={() => allowEditing && setIsEditingName(true)}
      >
        {documentName}
      </h1>
    )}
  </div>
  <div className="flex items-center flex-wrap gap-1 sm:gap-2">
    {/* Find and Replace - Now visible on mobile */}
    <button
      onClick={() => setShowFindReplace(true)}
      className="p-1 sm:p-2 md:p-3 hover:bg-[#151823] rounded-lg transition-colors text-gray-300 hover:text-blue-400"
      title="Find and Replace"
    >
      <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
    {/* New Document */}
    <button
      onClick={createNewDocument}
      className="p-1 sm:p-2 md:p-3 hover:bg-[#151823] rounded-lg transition-colors text-gray-300 hover:text-blue-400"
      title="New Document"
    >
      <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
    {/* Open Document */}
    <button
      onClick={() => fileInputRef.current?.click()}
      className="p-1 sm:p-2 md:p-3 hover:bg-[#151823] rounded-lg transition-colors text-gray-300 hover:text-blue-400"
      title="Open Document"
    >
      <FolderOpenIcon className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
    {/* Print */}
    <button
      onClick={handlePrint}
      className="p-1 sm:p-2 md:p-3 hover:bg-[#151823] rounded-lg transition-colors text-gray-300 hover:text-blue-400"
      title="Print"
    >
      <PrinterIcon className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
    {/* Export */}
    <ExportButton content={content} documentName={documentName} />
    {/* Fullscreen */}
    <button
      onClick={handleFullscreen}
      className="p-1 sm:p-2 md:p-3 hover:bg-[#151823] rounded-lg transition-colors text-gray-300 hover:text-blue-400"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? (
        <ArrowsPointingInIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      ) : (
        <ArrowsPointingOutIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      )}
    </button>
    {/* Save/Share Button */}
    {saveButton}
    {/* Remove mobile dropdown since all buttons are now visible */}
  </div>
</div>

				{/* Editor area */}
				<div className="flex-1 flex flex-col min-h-0" ref={editorRef}>
					{/* Custom Quill styles */}
					<style jsx global>{`
						.ql-toolbar.ql-snow {
							border: none !important;
							border-bottom: 1px solid #2a3142 !important;
							background: #1a1f2e !important;
							padding: 1rem !important;
						}

						.ql-container.ql-snow {
							border: none !important;
							background: #151823 !important;
							color: #e5e7eb !important;
						}

						.ql-editor {
							padding: 2rem !important;
							min-height: 300px !important;
							color: #e5e7eb !important;
							font-size: 16px !important;
							line-height: 1.6 !important;
						}

						.ql-editor p {
							margin-bottom: 1rem !important;
						}

						.ql-picker {
							color: #e5e7eb !important;
						}

						.ql-stroke {
							stroke: #e5e7eb !important;
						}

						120px.ql-fill {
							fill: #e5e7eb !important;
						}

						.ql-picker-options {
							background-color: #1a1f2e !important;
							border: 1px solid #2a3142 !important;
							color: #e5e7eb !important;
						}

						.ql-tooltip {
							background-color: #1a1f2e !important;
							border: 1px solid #2a3142 !important;
							color: #e5e7eb !important;
							box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
						}

						.ql-toolbar button:hover {
							color: #60a5fa !important;
						}

						.ql-toolbar button:hover .ql-stroke {
							stroke: #60a5fa !important;
						}

						.ql-toolbar button:hover .ql-fill {
							fill: #60a5fa !important;
						}

						.ql-editor:focus {
							outline: none !important;
						}

						.ql-formats {
							margin-right: 15px !important;
						}

						/* Toolbar separator */
						.ql-formats:not(:last-child) {
							border-right: 1px solid #2a3142 !important;
							padding-right: 15px !important;
						}
					`}</style>

					{/* Find/Replace toolbar with dark theme */}
					{showFindReplace && (
  <div className="bg-[#1a1f2e] text-white border-b border-[#2a3142] p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 z-50">
    {/* Search row */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <div className="flex-1 flex items-center gap-2 bg-[#151823] rounded-lg border border-[#2a3142] w-full">
        <div className="px-2 sm:px-3 py-1 sm:py-2">
          <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          ref={findInputRef}
          type="text"
          value={findText}
          onChange={handleFindInputChange}
          placeholder="Find..."
          className="flex-1 bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-500 py-1 sm:py-2 pr-2 sm:pr-3 text-sm sm:text-base"
        />
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={handleFindPrev}
          className="p-1 sm:p-2 hover:bg-[#151823] rounded-lg text-gray-400 hover:text-[#4d9fff] disabled:opacity-50 disabled:hover:text-gray-400"
          disabled={findResults.length === 0}
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={handleFindNext}
          className="p-1 sm:p-2 hover:bg-[#151823] rounded-lg text-gray-400 hover:text-[#4d9fff] disabled:opacity-50 disabled:hover:text-gray-400"
          disabled={findResults.length === 0}
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <span className="text-xs sm:text-sm text-gray-400">
          {findResults.length > 0
            ? `${currentFindIndex + 1} of ${findResults.length}`
            : "No results"}
        </span>
      </div>
      <button
        onClick={() => setShowFindReplace(false)}
        className="p-1 sm:p-2 hover:bg-[#151823] rounded-lg text-gray-400 hover:text-[#4d9fff]"
      >
        <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>

    {/* Replace row */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <div className="flex-1 flex items-center gap-2 bg-[#151823] rounded-lg border border-[#2a3142] w-full">
        <div className="px-2 sm:px-3 py-1 sm:py-2">
          <ClipboardIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with..."
          className="flex-1 bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-500 py-1 sm:py-2 pr-2 sm:pr-3 text-sm sm:text-base"
        />
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={handleReplace}
          disabled={findResults.length === 0}
          className="px-2 sm:px-4 py-1 sm:py-2 bg-[#151823] hover:bg-[#1f2937] text-gray-100 rounded-lg border border-[#2a3142] disabled:opacity-50 disabled:hover:bg-[#151823] text-xs sm:text-base"
        >
          Replace
        </button>
        <button
          onClick={handleReplaceAll}
          disabled={findResults.length === 0}
          className="px-2 sm:px-4 py-1 sm:py-2 bg-[#151823] hover:bg-[#1f2937] text-gray-100 rounded-lg border border-[#2a3142] disabled:opacity-50 disabled:hover:bg-[#151823] text-xs sm:text-base"
        >
          Replace All
        </button>
      </div>
    </div>
  </div>
)}

					{/* Editor component */}
					<div className="flex-1 min-h-0  bg-[#151823]">
						<ReactQuill
							style={{ height: "calc(100% - 100px)" }}
							forwardedRef={quillRef}
							theme="snow"
							value={content}
							onChange={setContent}
							modules={modules}
							formats={formats}
							
							readOnly={!allowEditing}
						/>
					</div>

					{/* Footer section */}
					<div className="border-t absolute bottom-0 w-full border-[#2a3142] p-4 bg-[#1a1f2e]">
						<div className="flex items-center justify-between text-gray-300">
							<WordCount content={content} />
							<span className="text-sm">
								Last saved: {lastSaved}
							</span>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				{!isSharedNote && (
					<div
						ref={sidebarRef}
						className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1a1f2e] transform transition-transform duration-300 ease-in-out ${
							isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
						} border-r border-[#2a3142]`}
					>
						<div className="flex flex-col h-full">
							{/* Sidebar Header */}
							<div className="p-4 border-b border-[#2a3142] flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-200">My Documents</h2>
								<button
									onClick={() => setIsSidebarOpen(false)}
									className="p-2 hover:bg-[#151823] rounded-lg text-gray-400 hover:text-[#4d9fff] transition-colors"
								>
									<ChevronLeftIcon className="h-5 w-5" />
								</button>
							</div>

							{/* Documents List */}
							<div className="flex-1 overflow-y-auto p-4 space-y-2">
								{documents.map((doc) => (
									<div
										key={doc.id}
										onClick={() => loadDocument({
											id: doc.id,
											content: doc.content,
											title: doc.name || 'Untitled Document',
											lastModified: doc.lastSaved
										})}
										className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
											currentDocId === doc.id
												? 'bg-[#4d9fff]/10 border border-[#4d9fff]/30'
												: 'hover:bg-[#151823] border border-transparent'
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3 min-w-0">
												<DocumentTextIcon className={`h-5 w-5 ${
													currentDocId === doc.id ? 'text-[#4d9fff]' : 'text-gray-400'
												}`} />
												<div className="min-w-0">
													<h3 className="text-sm font-medium text-gray-200 truncate">
														{doc.name || 'Untitled Document'}
													</h3>
													<p className="text-xs text-gray-400">
														{new Date(doc.lastSaved).toLocaleDateString()}
													</p>
												</div>
											</div>
											{/* Delete Button */}
											<button
												onClick={(e) => handleDeleteDoc(doc.id, e)}
												className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all duration-200"
												title="Delete document"
											>
												<TrashIcon className="h-4 w-4" />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Overlay when sidebar is open */}
				{isSidebarOpen && (
					<div 
						className="fixed  inset-0 bg-black/50 z-40"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}
			</div>
			
			{showSaveModal && (
				<SaveModal
					onClose={() => setShowSaveModal(false)}
					onSave={handleSaveSuccess}
					content={content}
					autoExpire={autoExpire}
					setAutoExpire={setAutoExpire}
					expireDays={expireDays}
					setExpireDays={setExpireDays}
					passwordProtect={passwordProtect}
					setPasswordProtect={setPasswordProtect}
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
				/>
			)}
			{showShareModal && currentShareId && (
				<ShareModal
					onClose={() => setShowShareModal(false)}
					shareId={currentShareId}
					allowEditing={false}
					setAllowEditing={() => {}}
					isPasswordProtected={false}
				/>
			)}
			<Toaster position="top-right" />
		</>
	);
}
