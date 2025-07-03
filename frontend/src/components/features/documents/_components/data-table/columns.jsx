"use client";

import Actions from "./actions";

export const columns = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "workspaceName",
		header: "Workspace Name",
	},
	{
		accessorKey: "workspace_id",
		header: "Workspace Id",
		enableHiding: true,
		filterFn: (row, id, filterValue) => {
			return String(row.getValue(id)) === String(filterValue);
		},
	},
	{
		accessorKey: "created_at",
		header: "Created At",
	},
	{
		accessorKey: "updated_at",
		header: "Updated At",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const documentId = row.original.id;

			return <Actions documentId={documentId} />;
		},
		size: 50,
	},
];
