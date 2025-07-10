"use client";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { useSelection } from "../../../../hooks/useSelection";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { WorkspaceSelect } from "./WorkspaceSelect";
import { createDocument } from "../../../../api/documents";
// import TemplateSelect from "./TemplateSelect";
import { toast } from "sonner";

const CreateNewDocument = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const {
    selectedWorkspaceId,
    selectedTemplateId,
    handleWorkspaceSelect: setSelectedWorkspaceId,
    handleTemplateSelect: setSelectedTemplateId,
  } = useSelection();

  const handleSave = async (templateId) => {
    if (!selectedWorkspaceId) return;

    const { success, data, errorMessage } = await createDocument({
      name: "Untitled Document",
      content: "",
      workspace_id: selectedWorkspaceId,
      template_id: templateId,
    });

    if (success) {
      navigate(`document/${data.id}`);
    } else {
      toast.error(
        errorMessage || "An error occured while creating the document",
      );
      console.log(errorMessage);
    }
  };

  const handleCreateBlankDocument = async () => {
    const { success, data, errorMessage } = await createDocument({
      name: "Untitled Document",
      content: "",
      workspace_id: selectedWorkspaceId,
      template_id: null,
    });
    if (success) {
      navigate(`/document/${data.id}`);
    } else {
      toast.error(
        errorMessage || "An error occured while creating the document",
      );
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedTemplateId(null);
      setSelectedWorkspaceId();
      setIsOpen(false);
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Document</Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[1080px] px-3 py-5 space-y-0">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 min-h-[450px]">
          <div className="flex items-center gap-4">
            <WorkspaceSelect
              selectedWorkspace={selectedWorkspaceId}
              setSelectedWorkspace={setSelectedWorkspaceId}
            />
            <Button
              variant="outline"
              className="w-[150px]"
              disabled={!selectedWorkspaceId}
              onClick={() => setIsOpen(true)}
            >
              Select a Template
            </Button>
            <p className="text-neutral-300 text-sm">OR</p>
            <Button
              variant="outline"
              onClick={handleCreateBlankDocument}
              disabled={!selectedWorkspaceId}
            >
              Create Blank Document
            </Button>
          </div>

          {/* {isOpen && (
						<TemplateSelect
							handleSave={handleSave}
							workspace_id={selectedWorkspaceId}
							userPrompt={userPrompt}
							setUserPrompt={setUserPrompt}
						/>
					)} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewDocument;
