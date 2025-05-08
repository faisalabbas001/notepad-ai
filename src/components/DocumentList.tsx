import React from "react";
import {
	DocumentIcon,
	TrashIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";

interface Document {
	id: string;
	name: string;
	content: string;
	lastSaved: string;
}

interface DocumentListProps {
	documents: Document[];
	onSelectDocument: (doc: Document) => void;
	onDeleteDocument: (id: string) => void;
	onNewDocument: () => void;
	isExpanded: boolean;
	setIsExpanded: (expanded: boolean) => void;
}

export default function DocumentList({
	documents,
	onSelectDocument,
	onDeleteDocument,
	onNewDocument,
	isExpanded,
	setIsExpanded,
}: DocumentListProps) {
	return (
		<div
			className={`relative flex flex-col h-[800px] bg-white border-r border-gray-200 transition-all duration-300 ${
				isExpanded ? "w-40 sm:w-80" : "w-12 sm:w-16"
			}`}
		>
			{/* Toggle button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="absolute -right-3 top-4 bg-blue-600 text-white border border-blue-600 rounded-full p-1.5 hover:bg-blue-700 z-10 shadow-md transition-colors"
				title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
			>
				{isExpanded ? (
					<ChevronLeftIcon className="h-4 w-4" />
				) : (
					<ChevronRightIcon className="h-4 w-4" />
				)}
			</button>

			{isExpanded && (
				<div className="p-3 sm:p-4 border-b border-gray-200">
					<h2 className="text-base sm:text-lg font-semibold text-gray-900">
						My Documents
					</h2>
				</div>
			)}
			<div className={`flex-1 overflow-y-auto p-2 ${isExpanded ? "" : "flex flex-col items-center"}`}>
				<div className="space-y-1 w-full">
					<div>
						{documents.map((doc) => (
							<div
								key={doc.id}
								className={`flex items-center ${isExpanded ? "justify-between p-2" : "justify-center p-1"} hover:bg-gray-50 rounded-lg cursor-pointer group`}
								onClick={() => onSelectDocument(doc)}
							>
								<div className="flex items-center gap-2 min-w-0">
									<DocumentIcon className={`flex-shrink-0 ${isExpanded ? "h-4 w-4 sm:h-5 sm:w-5" : "h-6 w-6"} text-gray-400`} />
									{isExpanded && (
										<div className="min-w-0 flex-1">
											<p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
												{doc.name}
											</p>
											<p className="text-[10px] sm:text-xs text-gray-500 truncate">
												{new Date(doc.lastSaved).toLocaleString()}
											</p>
										</div>
									)}
								</div>
								{isExpanded && (
									<button
										onClick={(e) => {
											e.stopPropagation();
											onDeleteDocument(doc.id);
										}}
										className="p-1 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
									>
										<TrashIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
