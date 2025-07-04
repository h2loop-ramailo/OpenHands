"use client";
import {
	BlockNoteSchema,
	defaultBlockSpecs,
	filterSuggestionItems,
	insertOrUpdateBlock,
	defaultInlineContentSpecs,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import './styles.css';
import {
	SuggestionMenuController,
	getDefaultReactSlashMenuItems,
	useCreateBlockNote,
} from "@blocknote/react";
import { RiChatSmile2Fill } from "react-icons/ri";
import { AIChat } from "./AIChat";
import { MermaidBlock } from "./MermaidBlock";
import { useEffect, useMemo, useState } from "react";
import {
	createDocument,
	getASingleDocument,
	updateDocument,
} from "../../../../../api/documents";
import { toast } from "sonner";
import { MermaidInlineContent } from "./MermaidBlock";
import ExportDocumentContent from "./Export";
import {
	convertMermaidToCodeBlock,
	getTheMarkdownContentForEditor,
	updateMermaidBlocks,
} from "../../../../../utils/utils";
import {DocumentIdContext} from "../../use-document-id";

const schema = BlockNoteSchema.create({
	blockSpecs: {
		...defaultBlockSpecs,
		aiChat: AIChat,
		mermaid: MermaidBlock,
	},
	inlineContentSpecs: {
		// Adds all default inline content.
		...defaultInlineContentSpecs,
		// Adds the mermaid tag.
		mermaidcontent: MermaidInlineContent,
	},
});

const Content = ({ workspacId, templateId, docId, onEditorReady }) => {
	const editor = useCreateBlockNote({
		schema,
		initialContent: [
			{
				type: "paragraph",
				content: "",
			},
			{
				type: "paragraph",
			},
		],
	});

	const hiddenEditor = useCreateBlockNote({
		schema,
		initialContent: [
			{
				type: "paragraph",
				content: "",
			},
		],
	});

	const [title, setTitle] = useState("Untitled Document");
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [loading, setLoading] = useState(true);

	const insertAIChat = useMemo(
		() => ({
			title: "Generate text with AI",
			onItemClick: async () => {
				await saveBlocksToBackend();

				insertOrUpdateBlock(editor, {
					type: "aiChat",
				});
				return true;
			},
			aliases: ["chat", "ai", "bot", "conversation"],
			group: "H2loop",
			icon: <RiChatSmile2Fill />,
		}),
		[editor]
	);

	const insertMermaid = useMemo(() => ({
		title: "Insert Mermaid diagram",
		onItemClick: async () => {
			await saveBlocksToBackend();

			insertOrUpdateBlock(editor, {
				type: "mermaid",
			});
			return true;
		},
		aliases: ["flowchart", "diagram", "chart"],
		group: "H2loop",
		icon: <RiChatSmile2Fill />,
	}));

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
		localStorage.setItem(
			`lastUpdatedAtLocalstorage-doc-${docId}`,
			new Date().getTime()
		);
	};

	const handleBlur = () => {
		setIsEditingTitle(false);
		if (!title.trim()) {
			setTitle("Untitled Document");
		}
	};

	const saveBlocks = () => {
		localStorage.setItem(
			`lastUpdatedAtLocalstorage-doc-${docId}`,
			new Date().getTime()
		);
	};

	const saveBlocksToBackend = async () => {
		try {
			if (!editor || !hiddenEditor) {
				console.error(
					"[SAVE_TO_BACKEND]: ",
					"Editor instance is not available"
				);
				toast.error("Something went wrong while saving document");
				return false;
			}

			// 1. Get the content from the mainEditor and set it to hiddenEditor
			const blocksJSON = editor.document;

			if (!blocksJSON) {
				console.error("[SAVE_TO_BACKEND]: ", "No blocks found");
				toast.error("No blocks found");
				return false;
			}

			const documentMarkdown = await getTheMarkdownContentForEditor(
				blocksJSON,
				hiddenEditor
			);

			const { success, errorMessage } = await updateDocument({
				name: title,
				content: documentMarkdown,
				template_id: templateId,
				workspace_id: workspacId,
				docId,
			});
			if (success) {
				localStorage.setItem(
					`lastUpdatedAtBE-doc-${docId}`,
					new Date().getTime()
				);
				toast.success("Document autosaved");
				return true;
			} else {
			}
		} catch (error) {
			console.error("[SAVE_TO_BACKEND]: ", error);
			toast.error(error.message || "Error saving document");
			return false;
		}
	};

	useEffect(() => {
		localStorage.clear();
		const curentTimeStamp = new Date().getTime();
		localStorage.setItem(`lastUpdatedAtBE-doc-${docId}`, curentTimeStamp);
		localStorage.setItem(
			`lastUpdatedAtLocalstorage-doc-${docId}`,
			curentTimeStamp
		);
	}, []);

	useEffect(() => {
		if (loading) return;

		const interval = setInterval(async () => {
			if (
				localStorage.getItem(`lastUpdatedAtLocalstorage-doc-${docId}`) >
				localStorage.getItem(`lastUpdatedAtBE-doc-${docId}`)
			) {
				await saveBlocksToBackend();
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [title, localStorage, loading]);

	const handleEditorChange = (editor) => {
		const blocksJSON = editor.topLevelBlocks;
		saveBlocks(blocksJSON);
	};

	// Load Saved Content
	useEffect(() => {
		if (!editor || !hiddenEditor) {
			toast.error("Error loading document");
			return;
		}

		const loadSavedContent = async () => {
			setLoading(true);
			try {
				const { success, data, errorMessage } = await getASingleDocument(docId);
				if (!success) {
					toast.error(errorMessage || "Error loading document");
					return;
				} else {
					setTitle(data.name);
					let parsedContent;
					if (data && data.content_type == "MARKDOWN") {
						parsedContent = await hiddenEditor.tryParseMarkdownToBlocks(
							data.content
						);
					} else {
						parsedContent = JSON.parse(data.content || "[]");
					}

					parsedContent = updateMermaidBlocks(parsedContent);

					if (!editor || !hiddenEditor) {
						console.log("Editor destroyed");
						return;
					}

					if (parsedContent.length !== 0) {
						editor.replaceBlocks(editor.document, parsedContent);
					}
				}
			} catch (error) {
				toast.error("Error loading document");
			} finally {
				setLoading(false);
			}
		};

		loadSavedContent();
	}, []);

	// Add this effect to expose the editor
	useEffect(() => {
		if (editor) {
			onEditorReady(editor);
		}
	}, [editor, onEditorReady]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<DocumentIdContext.Provider value={docId}>
		<div className='flex flex-col h-full bg-base text-content rounded-2xl p-4 md:p-8 shadow-lg'>
			<div className='container mx-auto mb-3 flex items-center justify-between'>
				{isEditingTitle ? (
					<input
						autoFocus
						className={`text-2xl font-bold bg-neutral-900 border border-neutral-700 focus:bg-neutral-800 focus:border-purple-600 focus:ring-0 focus:ring-purple-200 focus:outline-none transition-all duration-200 rounded px-2 py-1 min-w-[50%] text-content`}
						placeholder={title}
						value={title}
						onChange={handleTitleChange}
						onBlur={handleBlur}
						onKeyDown={(e) => {
							if (e.key === "Enter") e.target.blur();
						}}
					/>
				) : (
					<h2
						className='text-2xl max-w-[50%] font-bold cursor-text truncate'
						onClick={() => setIsEditingTitle(true)}
					>
						{title}
					</h2>
				)}

				<ExportDocumentContent
					editor={editor}
					hiddenEditor={hiddenEditor}
					title={title}
				/>
			</div>
			<div className='border border-purple-900 rounded-lg h-full'>
				<div className='min-h-[60vh] max-h-[70vh] overflow-y-auto flex-1 p-4' style={{ backgroundColor: '#23272e' }}>
					<BlockNoteView
						editor={editor}
						slashMenu={false}
						className='mt-4'
						theme='dark'
						onChange={handleEditorChange}
					>
						<SuggestionMenuController
							triggerCharacter='/'
							getItems={async (query) =>
								filterSuggestionItems(
									[
										insertAIChat,
										insertMermaid,
										...getDefaultReactSlashMenuItems(editor),
									],
									query
								)
							}
						/>
					</BlockNoteView>
				</div>
			</div>
		</div>
		</DocumentIdContext.Provider>

	);
};

export default Content;
