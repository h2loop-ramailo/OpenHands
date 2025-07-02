import {
	IconBrandTabler,
	IconArrowIteration,
	IconUserBolt,
	IconTemplate
} from "@tabler/icons-react";

export const links = [
	{
		label: "Documents",
		href: "/documents",
		icon: (
			<IconBrandTabler className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
		),
	},
	{
		label: "Workspaces",
		href: "/workspace",
		icon: (
			<IconUserBolt className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
		),
	},
	{
		label: "Templates",
		href: "/template",
		icon: (
			<IconTemplate className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
		),
	},
	{
		label: "Pipelines",
		href: "/pipeline",
		icon: (
			<IconArrowIteration className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
		),
	},
];

export const workspaces = [
	{
		id: "1",
		name: "Workspace 1",
		description: "Collaborative space for our design projects",
		codebases: [],
		documents: [],
	},
	{
		id: "2",
		name: "Workspace 2",
		description: "Where we code and build amazing things",
		codebases: [],
		documents: [],
	},
	{
		id: "3",
		name: "Workspace 3",
		description: "Planning and executing our marketing strategies",
		codebases: [],
		documents: [],
	},
	{
		id: "4",
		name: "Workspace 4",
		description: "Overseeing product development and strategy",
		codebases: [],
		documents: [],
	},
];

export const templates = [
	{
		id: "1",
		name: "Template 1",
	},
	{
		id: "2",
		name: "Template 2",
	},
	{
		id: "3",
		name: "Template 3",
	},
	{
		id: "4",
		name: "Template 4",
	},
];

export const codebases = [
	{
		id: "1",
		name: "Codebase 1",
		size: "1.2 GB",
		lastModified: "2021-09-01",
	},
	{
		id: "2",
		name: "Codebase 2",
		size: "1.2 GB",
		lastModified: "2021-09-01",
	},
];

export const documents = [
	{
		id: "1",
		name: "Document 1",
		size: "1.2 MB",
		lastModified: "2021-09-01",
	},
	{
		id: "2",
		name: "Document 2",
		size: "1.2 MB",
		lastModified: "2021-09-01",
	},
];
