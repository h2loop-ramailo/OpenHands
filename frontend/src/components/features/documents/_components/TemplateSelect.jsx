"use client";
import { useEffect, useState } from "react";
// import { TemplateList } from "./templates/TemplateList";
import { getAllTemplates } from "../../../../api/templates";

const TemplateSelect = ({
	handleSave,
	workspaceId,
	userPrompt,
	setUserPrompt,
}) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getData() {
		setLoading(true);
		const data = await getAllTemplates();
		if (data.success) {
			setData(data.data);
		} else {
			setError(data.errorMessage);
		}
		setLoading(false);
	}

	useEffect(() => {
		getData();
	}, []);

	const [selectedTemplateInDialog, setSelectedTemplateInDialog] = useState(
		data[0]?.id || ""
	);

	return (
		// <TemplateList
		// 	templates={data}
		// 	selectedTemplateInDialog={selectedTemplateInDialog}
		// 	setSelectedTemplateInDialog={setSelectedTemplateInDialog}
		// 	userPrompt={userPrompt}
		// 	setUserPrompt={setUserPrompt}
		// 	handleSave={async (templateId) => {
		// 		await handleSave(templateId);
		// 	}}
		// />
		<h3>Template Select</h3>
	);
};

export default TemplateSelect;
