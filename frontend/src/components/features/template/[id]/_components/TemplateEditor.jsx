"use client";
import {
	BlockNoteSchema,
	defaultBlockSpecs,
	filterSuggestionItems,
	insertOrUpdateBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
	SuggestionMenuController,
	getDefaultReactSlashMenuItems,
	useCreateBlockNote,
} from "@blocknote/react";
import { RiChatSmile2Fill } from "react-icons/ri";
import { AIChat } from "./AIChat";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateATemplate } from "../../../../../api/templates";
import CreateDocumentButton from "./create-document-button";
import styles from "./TemplateEditor.module.css";

const schema = BlockNoteSchema.create({
	blockSpecs: {
		...defaultBlockSpecs,
		aiChat: AIChat,
	},
});

const TemplateEditor = ({ data, templateId }) => {
	const editor = useCreateBlockNote({
		schema,
		initialContent: [
			{
				type: "paragraph",
				content: "This is a new template!",
			},
			{
				type: "paragraph",
			},
		],
	});

	const [_, setBlocks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState(data.title || "Untitled Template");
	const [isEditingTitle, setIsEditingTitle] = useState(false);

	const insertAIChat = (editor) => ({
		title: "AI Chat",
		onItemClick: async () => {
			await saveBlocksToBackend();

			insertOrUpdateBlock(editor, {
				type: "aiChat",
			});
		},
		aliases: ["chat", "ai", "bot", "conversation"],
		group: "AI",
		icon: <RiChatSmile2Fill />,
	});

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
		localStorage.setItem(
			`lastUpdatedAtLocalstorage-template-${templateId}`,
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
			`lastUpdatedAtLocalstorage-template-${templateId}`,
			new Date().getTime()
		);
	};

	const saveBlocksToBackend = async () => {
		try {
			const { success, errorMessage } = await updateATemplate({
				templateId: templateId,
				content: JSON.stringify(editor.topLevelBlocks),
				name: title,
			});
			if (success) {
				localStorage.setItem(
					`lastUpdatedAtBE-template-${templateId}`,
					new Date().getTime()
				);
				toast.success("Template autosaved");
				return true;
			} else {
				toast.error("Error saving template");
				return false;
			}
		} catch (error) {
			toast.error("Error saving template");
			return false;
		}
	};

	useEffect(() => {
		localStorage.clear();
		const curentTimeStamp = new Date().getTime();
		localStorage.setItem(
			`lastUpdatedAtBE-template-${templateId}`,
			curentTimeStamp
		);
		localStorage.setItem(
			`lastUpdatedAtLocalstorage-template-${templateId}`,
			curentTimeStamp
		);
	}, []);

	useEffect(() => {
		if (loading) return;

		const interval = setInterval(async () => {
			if (
				localStorage.getItem(
					`lastUpdatedAtLocalstorage-template-${templateId}`
				) > localStorage.getItem(`lastUpdatedAtBE-template-${templateId}`)
			) {
				await saveBlocksToBackend();
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [title, localStorage, loading]);

	const handleEditorChange = (editor) => {
		const blocksJSON = editor.topLevelBlocks;
		setBlocks(blocksJSON);
		saveBlocks();
	};

	// Load Saved Content
	useEffect(() => {
		if (!editor) {
			toast.error("Error loading document");
			return;
		}

		const loadSavedContent = async () => {
			setLoading(true);
			try {
				let parsedContent;
				parsedContent = JSON.parse(data.content || "[]");

				if (!editor) {
					console.log("Editor destroyed");
					return;
				}

				if (parsedContent.length !== 0) {
					editor.replaceBlocks(editor.document, parsedContent);
				}
				setBlocks(parsedContent);
			} catch (error) {
				toast.error("Error loading document");
			} finally {
				setLoading(false);
			}
		};

		loadSavedContent();
	}, [editor]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex flex-col h-full bg-base text-content rounded-2xl p-4 md:p-8 shadow-lg'>
			<div className='container mx-auto mb-3 flex items-center justify-between'>
				{isEditingTitle ? (
					<input
						autoFocus
						className={`${styles.templateTitle} text-2xl font-bold bg-neutral-900 border border-neutral-700 focus:bg-neutral-800 focus:border-purple-600 focus:ring-0 focus:ring-purple-200 focus:outline-none transition-all duration-200 rounded px-2 py-1 min-w-[50%] text-content`}
						placeholder={title}
						value={title}
						onChange={handleTitleChange}
						onBlur={handleBlur}
						onKeyDown={(e) => {
							if (e.key === "Enter") e.target.blur();
						}}
					/>
				) : (
					<div
						className="flex items-center gap-2 cursor-pointer group"
						onClick={() => setIsEditingTitle(true)}
					>
						<h2 className={`${styles.templateTitle} text-2xl w-full font-bold text-content`}>
							{title}
						</h2>
						<svg
							width="32"
							height="32"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							className="opacity-60 group-hover:opacity-100 transition-opacity duration-200"
							viewBox="0 0 24 24"
						>
							<path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
							<path d="M16 7l1.5-1.5a2.121 2.121 0 1 1 3 3L19 10" />
						</svg>
					</div>
				)}

				<CreateDocumentButton templateId={templateId} />
			</div>
			<div className='border border-purple-900 rounded-lg h-full'>
				<div className='min-h-[60vh] max-h-[70vh] overflow-y-auto flex-1 bg-base-secondary p-4 mt-4'>
					<BlockNoteView
						editor={editor}
						slashMenu={false}
						theme='dark'
						onChange={handleEditorChange}
					>
						<SuggestionMenuController
							triggerCharacter='/'
							getItems={async (query) =>
								filterSuggestionItems(
									[
										...getDefaultReactSlashMenuItems(editor),
										insertAIChat(editor),
									],
									query
								)
							}
						/>
					</BlockNoteView>
				</div>
			</div>
		</div>
	);
};

export default TemplateEditor;
