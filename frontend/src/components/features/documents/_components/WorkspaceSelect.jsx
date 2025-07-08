"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { getAllWorkspaces } from "../../../../api/workspaces";
import { useEffect, useState } from "react";

export const WorkspaceSelect = ({
  selectedWorkspace,
  setSelectedWorkspace,
  fullWidth = false,
  label = "Select a Workspace",
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    setLoading(true);
    const data = await getAllWorkspaces();
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

  if (loading)
    return <div className="text-neutral-400">Loading Workspaces</div>;
  if (error) {
    return <div className="text-lg text-red-400">{error}</div>;
  }

  return (
    <Select
      defaultValue={selectedWorkspace}
      onValueChange={(value) => setSelectedWorkspace(value)}
      className="bg-neutral-900 text-neutral-100 rounded-md border border-neutral-700"
    >
      <SelectTrigger
        className={
          (fullWidth ? "w-full" : "w-[200px]") +
          " bg-neutral-900 text-neutral-100 border border-neutral-700 placeholder:text-neutral-500 focus:ring-0 outline-none rounded-md transition-colors duration-150"
        }
      >
        <SelectValue placeholder={label} className="text-neutral-500" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-md shadow-lg">
        <SelectGroup>
          {data.map((workspace) => (
            <SelectItem
              value={workspace.id}
              key={workspace.id}
              onClick={() => setSelectedWorkspace(workspace.id)}
              className="hover:bg-neutral-800 focus:bg-neutral-800 text-neutral-100 cursor-pointer transition-colors duration-100 rounded"
            >
              {workspace.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
