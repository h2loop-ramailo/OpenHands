"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconRefresh } from "@tabler/icons-react";
import { CircleAlert, FileScan } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SingleCodebase = ({ codebase, handleSync }) => {
  const [selectedVersion, setSelectedVersion] = useState(
    codebase?.versions[0] || null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If there are no versions, then we don't need to show the loading state
    if (!codebase.versions) {
      setIsLoading(false);
      return;
    }

    if (
      codebase?.versions &&
      codebase?.versions?.length > 0 &&
      selectedVersion
    ) {
      if (selectedVersion.status === "PROCESSING") setIsLoading(true);
      else setIsLoading(false);
    }
  }, []);

  // Sync the codebase every 5 minutes if the selected version is processing
  useEffect(() => {
		if (selectedVersion?.status === "PROCESSING") {
			const interval = setInterval(() => {
				handleSync();
			}, 300000);

			return () => clearInterval(interval);
		}
	}, [handleSync]);

  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-2 rounded border p-2",
        isLoading && "bg-gray-100 animate-pulse"
      )}
    >
      <div className="flex items-center space-x-1">
        <FileScan size={18} color="#2563eb" />
        <p className="text-sm">{codebase.name}</p>
      </div>

      <div className="flex items-center space-x-2">
        {!codebase.versions || codebase.versions.length < 1 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleAlert className="h-4 w-4 text-red-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-44 mr-10 bg-red-500 text-white p-2 rounded">
                Some error occurred while fetching this codebase.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Select
            defaultValue={selectedVersion}
            onValueChange={setSelectedVersion}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Version" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Versions</SelectLabel>
                {codebase?.versions?.map((version, _idx) => (
                  <SelectItem
                    value={version}
                    key={"version-" + version.name + "-" + _idx}
                  >
                    {version.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
				variant="outline"
				className="h-8 w-8"
                onClick={() => handleSync(codebase)}
              >
                <IconRefresh />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SingleCodebase;
