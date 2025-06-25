import { useTranslation } from "react-i18next";
import H2LoopLogo from "#/assets/branding/h2loop-logo.svg?react";
import { I18nKey } from "#/i18n/declaration";
import { TooltipButton } from "./tooltip-button";

export function H2LoopLogoButton() {
  const { t } = useTranslation();

  return (
    <TooltipButton
      tooltip={t(I18nKey.BRANDING$H2LOOP_AI)}
      ariaLabel={t(I18nKey.BRANDING$H2LOOP_LOGO)}
      navLinkTo="/"
    >
      <H2LoopLogo width={34} height={34} />
    </TooltipButton>
  );
}
