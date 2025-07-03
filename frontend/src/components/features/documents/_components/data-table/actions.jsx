"use client";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../../../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import { useNavigate } from "react-router";
import { deleteDocument } from "../../../../../api/documents";
import { toast } from "sonner";

const Actions = ({ documentId }) => {
	const navigate = useNavigate();

	const handleViewDocument = () => {
		navigate(`/document/${documentId}`);
	};

	const handleDeleteDocument = async () => {
		const { success, errorMessage } = await deleteDocument(documentId);
		if (success) {
			toast.success("Document deleted successfully");
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} else {
			toast.error(
				errorMessage || "An error occurred while deleting document"
			);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-neutral-900 text-neutral-100 rounded-md shadow-lg border border-neutral-700 p-1 min-w-[160px]'>
				<DropdownMenuLabel className='text-neutral-300'>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={handleViewDocument}
					className='hover:bg-neutral-800 focus:bg-neutral-800 rounded text-neutral-100 cursor-pointer transition-colors duration-100'
				>
					View Document
				</DropdownMenuItem>
				<DropdownMenuSeparator className='bg-neutral-700' />
				<DropdownMenuItem
					className='text-red-400 hover:text-red-500 focus:text-red-500 hover:bg-neutral-800 focus:bg-neutral-800 rounded cursor-pointer transition-colors duration-100'
					onClick={handleDeleteDocument}
				>
					Delete Document
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Actions;
