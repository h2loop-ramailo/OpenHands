"use client";

import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import Mermaid from "@/components/Mermaid";
import { createReactInlineContentSpec } from "@blocknote/react";
import { useEffect, useState } from "react";

// The Mermaid inline content.
export const MermaidInlineContent = createReactInlineContentSpec(
	{
		type: "mermaidcontent",
		propSchema: {
			code: {
				default: "",
			},
		},
		content: "none",
	},
	{
		render: (props) => <Mermaid chart={props.inlineContent.props.code} />,
	}
);

export const MermaidBlock = createReactBlockSpec(
	{
		type: "mermaid",
		propSchema: {
			textAlignment: defaultProps.textAlignment,
			textColor: defaultProps.textColor,
			displayType: {
				default: "text",
				values: ["text", "chart"],
			},
		},
		content: "inline",
	},
	{
		render: (props) => {
			const [isReady, setIsReady] = useState(false);
			const [isLoading, setIsLoading] = useState(true);

			useEffect(() => {
				const hasContent = props.block.content[0] !== undefined;
				if (hasContent && props.block.props.displayType === "chart") {
					const timer = setTimeout(() => {
						setIsReady(true);
						setIsLoading(false);
					}, 500);
					return () => clearTimeout(timer);
				} else {
					setIsReady(true);
					setIsLoading(false);
				}
			}, [props.block.content]);

			function handleClick() {
				const isSwitchingToChart = props.block.props.displayType === "text";
				if (isSwitchingToChart) {
					setIsLoading(true);
				}

				props.editor.updateBlock(props.block, {
					props: {
						...props.block.props,
						displayType: isSwitchingToChart ? "chart" : "text",
					},
				});

				if (isSwitchingToChart) {
					setTimeout(() => {
						setIsLoading(false);
					}, 200);
				}
			}

			function handleInput(e) {
				props.editor.updateBlock(props.block, {
					content: [
						{
							type: "mermaidcontent",
							props: {
								code: e.target.value,
							},
						},
					],
				});
			}

			const content = props.block.content[0];
			const hasContent = content !== undefined;

			const showChart =
				isReady && props.block.props.displayType === "chart" && hasContent;

			const Loader = () => (
				<div className='flex items-center justify-center w-full h-[150px]'>
					<div className='flex items-center space-x-2'>
						<div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'></div>
						<div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150'></div>
						<div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300'></div>
						<span className='ml-2 text-sm text-gray-600'>
							Rendering diagram...
						</span>
					</div>
				</div>
			);

			return (
				<div className='grid w-full grid-cols-4 gap-2 group'>
					<div className='col-span-3'>
						{isLoading ? (
							<Loader />
						) : !showChart ? (
							<textarea
								className='bg-muted p-2 rounded-lg text-sm text-black/80 min-h-[150px] max-h-[300px] w-full'
								value={hasContent ? content.props.code : ""}
								onChange={handleInput}
								spellCheck='false'
								ref={props.contentRef}
							/>
						) : (
							<Mermaid chart={content.props.code} />
						)}
					</div>
					<button
						onClick={handleClick}
						className='bg-muted ml-auto h-fit cursor-pointer rounded-lg border px-2 py-0 text-black/20 transition-colors duration-100 hover:text-black select-none opacity-0 group-hover:opacity-100'
						disabled={isLoading}
					>
						{props.block.props.displayType === "text"
							? "Show Chart"
							: "Show Text"}
					</button>
				</div>
			);
		},

		toExternalHTML: (props) => {
			const content = props.block.content[0];
			return (
				<div className='grid w-full grid-cols-4 gap-2 group'>
					<div className='col-span-3'>
						{content && <Mermaid chart={content.props.code} />}
					</div>
				</div>
			);
		},
	}
);
