import { useTranslation } from "react-i18next";
import { I18nKey } from "#/i18n/declaration";
import PlusIcon from "#/icons/plus.svg?react";
import { TooltipButton } from "./tooltip-button";
import { useCreateConversation } from "#/hooks/mutation/use-create-conversation";

interface NewProjectButtonProps {
  disabled?: boolean;
}

export function NewProjectButton({ disabled = false }: NewProjectButtonProps) {
  const { t } = useTranslation();
  const startNewProject = t(I18nKey.CONVERSATION$START_NEW);

  const { mutate: createConversation } = useCreateConversation();

  return (
    <TooltipButton
      tooltip={startNewProject}
      ariaLabel={startNewProject}
      navLinkTo="/"
      testId="new-project-button"
      onClick={() => createConversation({})}
      disabled={disabled}
    >
      <PlusIcon width={28} height={28} />
    </TooltipButton>
  );
}
