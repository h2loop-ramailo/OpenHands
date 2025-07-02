"use client";
import { useState } from "react";

const Header = () => {
	const [data, setData] = useState({
		title: "Untitled Document",
	});

	const [isEditingTitle, setIsEditingTitle] = useState(false);

	const handleTitleChange = (e) => {
		setData({ ...data, title: e.target.value });
	};
	const handleBlur = () => {
		setIsEditingTitle(false);
		if (!data.title.trim()) {
			setData({ ...data, title: "Untitled Document" });
		}
	};
	return (
		<div className='flex items-center justify-between w-full'>
			<div className='container mx-auto mb-3'>
				{isEditingTitle ? (
					<input
						autoFocus
						className='text-2xl font-bold bg-transparent border-b focus:outline-none w-[30%]'
						placeholder={data.title}
						value={data.title}
						onChange={handleTitleChange}
						onBlur={handleBlur}
						onKeyDown={(e) => {
							if (e.key === "Enter") e.target.blur();
						}}
					/>
				) : (
					<h2
						className='text-2xl w-full font-bold cursor-text'
						onClick={() => setIsEditingTitle(true)}
					>
						{data.title}
					</h2>
				)}
			</div>
		</div>
	);
};

export default Header;
