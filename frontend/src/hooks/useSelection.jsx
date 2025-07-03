"use client";
import { useState } from "react";

export const useSelection = () => {
	const [selectedWorkspaceId, setSelectedWorkspaceId] = useState();
	const [selectedTemplateId, setSelectedTemplateId] = useState(null);

	const handleWorkspaceSelect = (workspaceId) => {
		setSelectedWorkspaceId(workspaceId);
	};

	const handleTemplateSelect = (templateId) => {
		setSelectedTemplateId(templateId);
	};

	return {
		selectedWorkspaceId,
		selectedTemplateId,
		handleWorkspaceSelect,
		handleTemplateSelect,
	};
};
