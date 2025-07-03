"use client";

import { Button } from "../../../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import { getTheMarkdownContentForEditor } from "../../../../../utils/utils";
import { toast } from "sonner";

const ExportDocumentContent = ({ editor, hiddenEditor, title }) => {
	if (!editor) return null;

	const generateHTMLContent = async (blocksJSON) => {
		const baseHtmlContent = await editor.blocksToHTMLLossy(blocksJSON);
		const hasMermaid = JSON.stringify(blocksJSON).includes('"type":"mermaid"');

		let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
    pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; }
    .mermaid { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
  </style>
  ${
		hasMermaid
			? '<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>'
			: ""
	}
  ${
		hasMermaid
			? `<script>
    mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        flowchart: {
            subGraphTitleMargin: {
                top: 0,
                bottom: 50,
            },
            nodeSpacing: 70,
            rankSpacing: 100,
            padding: 20,
            diagramPadding: 40,
        },
        themeCSS: \`
        g.classGroup rect {
          fill: #282a36;
          stroke: #6272a4;
        }
        g.classGroup text {
          fill: #f8f8f2;
        }
        g.classGroup line {
          stroke: #f8f8f2;
          stroke-width: 0.5;
        }
        .classLabel .box {
          stroke: #21222c;
          stroke-width: 3;
          fill: #21222c;
          opacity: 1;
        }
        .classLabel .label {
          fill: #f1fa8c;
        }
        .relation {
          stroke: #ff79c6;
          stroke-width: 1;
        }
        #compositionStart, #compositionEnd {
          fill: #bd93f9;
          stroke: #bd93f9;
          stroke-width: 1;
        }
        #aggregationEnd, #aggregationStart {
          fill: #21222c;
          stroke: #50fa7b;
          stroke-width: 1;
        }
        #dependencyStart, #dependencyEnd {
          fill: #00bcd4;
          stroke: #00bcd4;
          stroke-width: 1;
        }
        #extensionStart, #extensionEnd {
          fill: #f8f8f2;
          stroke: #f8f8f2;
          stroke-width: 1;
        }\`,
        fontFamily: "Fira Code",
    });
    </script>`
			: ""
	}
</head>
<body>
  ${baseHtmlContent}
  ${
		hasMermaid
			? '<script>document.addEventListener("DOMContentLoaded", function() { mermaid.init(undefined, ".mermaid"); });</script>'
			: ""
	}
</body>
</html>`;

		if (hasMermaid) {
			html = html.replace(
				/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
				'<pre class="mermaid">$1</pre>'
			);
		}

		return html;
	};

	const downloadFile = (content, fileName, type) => {
		const blob = new Blob([content], { type });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");

		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();

		setTimeout(() => URL.revokeObjectURL(url), 100);
		document.body.removeChild(a);
	};

	const handleMarkdownExport = async () => {
		try {
			const blocksJSON = editor.document;
			if (!blocksJSON) {
				console.error("[EXPORT_MD]: No blocks found");
				toast.error("No blocks found");
				return;
			}

			const mdContent = await getTheMarkdownContentForEditor(
				blocksJSON,
				hiddenEditor
			);
			downloadFile(mdContent, `${title}.md`, "text/plain;charset=utf-8");
		} catch (error) {
			console.error("Error exporting markdown:", error);
			toast.error("Failed to export as Markdown");
		}
	};

	const handleHTMLExport = async () => {
		try {
			const blocksJSON = editor.document;
			if (!blocksJSON) {
				console.error("[EXPORT_HTML]: No blocks found");
				toast.error("No blocks found");
				return;
			}

			const htmlContent = await generateHTMLContent(blocksJSON);
			downloadFile(htmlContent, `${title}.html`, "text/html");
		} catch (error) {
			console.error("Error exporting HTML:", error);
			toast.error("Failed to export as HTML");
		}
	};

	const handlePDFExport = async () => {
		try {
			const blocksJSON = editor.document;
			if (!blocksJSON) {
				console.error("[EXPORT_PDF]: No blocks found");
				toast.error("No blocks found");
				return;
			}

			const htmlContent = await generateHTMLContent(blocksJSON);
			const hasMermaid = JSON.stringify(blocksJSON).includes('"type":"mermaid"');

			// Add print-specific styles to make pagination more predictable
			const printStyles = `
      @media print {
        body {
          width: 210mm;
          padding: 15mm;
          margin: 0;
        }
        pre, .mermaid, img {
          page-break-inside: avoid;
          max-width: 100%;
        }
        h1, h2, h3 {
          page-break-after: avoid;
        }
      }
    `;

			const printHtml = htmlContent.replace(
				"</head>",
				`<style>${printStyles}</style></head>`
			);

			const printWindow = window.open("", "_blank");
			printWindow.document.write(printHtml);
			printWindow.document.close();

			printWindow.onload = () => {
				if (hasMermaid) {
					// Set a notification for users that diagrams are rendering
					const notificationDiv = printWindow.document.createElement('div');
					notificationDiv.style.position = 'fixed';
					notificationDiv.style.top = '10px';
					notificationDiv.style.left = '50%';
					notificationDiv.style.transform = 'translateX(-50%)';
					notificationDiv.style.backgroundColor = '#f0f9ff';
					notificationDiv.style.color = '#0369a1';
					notificationDiv.style.padding = '10px 20px';
					notificationDiv.style.borderRadius = '4px';
					notificationDiv.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
					notificationDiv.style.zIndex = '9999';
					notificationDiv.id = 'mermaid-loading';
					notificationDiv.innerText = 'Rendering diagrams...';
					printWindow.document.body.appendChild(notificationDiv);

					// Add a longer delay for mermaid to properly initialize and render
					const renderTimeout = 3000; // 3 seconds

					if (
						printWindow.mermaid &&
						typeof printWindow.mermaid.init === "function"
					) {
						try {
							// Initialize mermaid in the new window
							printWindow.mermaid.init(
								undefined,
								printWindow.document.querySelectorAll(".mermaid")
							);
							console.log("Mermaid initialized in print window");

							// Wait for rendering to complete before printing
							setTimeout(() => {
								// Remove notification before printing
								const notificationElement = printWindow.document.getElementById('mermaid-loading');
								if (notificationElement) {
									notificationElement.remove();
								}
								printWindow.print();
							}, renderTimeout);
						} catch (e) {
							console.warn("Failed to manually initialize mermaid:", e);
							// Remove notification and print anyway in case of error
							const notificationElement = printWindow.document.getElementById('mermaid-loading');
							if (notificationElement) {
								notificationElement.remove();
							}
							printWindow.print();
						}
					} else {
						// If mermaid isn't available for some reason, print anyway after delay
						setTimeout(() => {
							const notificationElement = printWindow.document.getElementById('mermaid-loading');
							if (notificationElement) {
								notificationElement.remove();
							}
							printWindow.print();
						}, renderTimeout);
					}
				} else {
					// If no mermaid diagrams, print immediately
					printWindow.print();
				}
			};
		} catch (error) {
			console.error("Error exporting PDF:", error);
			toast.error("Failed to export as PDF");
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Export</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Export as</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleMarkdownExport}>
					Markdown
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleHTMLExport}>HTML</DropdownMenuItem>
				<DropdownMenuItem onClick={handlePDFExport}>PDF</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ExportDocumentContent;
