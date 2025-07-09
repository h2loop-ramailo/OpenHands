import React from "react";
import {
  Dialog,
  DialogContent as RawDialogContent,
} from "#/components/ui/dialog";
import styles from "./ToolCard.module.css";
import { RepoConnector } from "../repo-connector";
import { BrandButton } from "../../settings/brand-button";

const DialogContent = RawDialogContent as React.FC<
  React.PropsWithChildren<any>
>;

export type ToolModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  image: string;
  description: string;
};

export function ToolModal({
  open,
  onOpenChange,
  title,
  image,
  description,
}: ToolModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-3xl w-full rounded-2xl bg-[#181b20] border-0 shadow-2xl">
        <div className="flex flex-col items-center p-8 gap-4 w-full max-w-2xl mx-auto">
          <div className="flex flex-col items-center w-full">
            <img
              src={image}
              alt={title}
              className={styles.image}
              style={{ width: 80, height: 80, marginBottom: 16 }}
            />
            <h2
              className={styles.title}
              style={{ fontSize: "1.5rem", marginBottom: 8 }}
            >
              {title}
            </h2>
            <p
              className={styles.description}
              style={{ fontSize: "1.05rem", marginBottom: 16 }}
            >
              {description}
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-4 mt-2">
            {/* Repo/Branch selection */}
            <div className="flex flex-col items-center w-full max-w-md mx-auto">
              <RepoConnector
                onRepoSelection={(title) => {
                  // setSelectedRepoTitle(title)
                }}
              />
            </div>
            {/* Dynamic dropdown placeholder */}
            <div className="flex flex-col items-center w-full max-w-md mx-auto">
              <div className="text-sm text-neutral-400 mb-1 text-center">
                Select Class/Interface Name
              </div>
              <div className="bg-[#23272e] rounded-lg p-4 min-h-[60px] flex items-center justify-center text-neutral-500 w-full">
                [Dynamic dropdown goes here]
              </div>
            </div>
            <div className="flex justify-center w-full">
              <BrandButton
                testId="tool-generate-button"
                variant="primary"
                type="button"
                className="mt-4 max-w-md w-full text-lg font-bold"
                onClick={() => {
                  /* TODO: handle generate and navigation */
                }}
              >
                Create / Generate
              </BrandButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
