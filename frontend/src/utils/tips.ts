import { I18nKey } from "#/i18n/declaration";

export interface Tip {
  key: I18nKey;
  link?: string;
}

export const TIPS: Tip[] = [
  {
    key: I18nKey.TIPS$CUSTOMIZE_MICROAGENT,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
  {
    key: I18nKey.TIPS$SETUP_SCRIPT,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
  { key: I18nKey.TIPS$VSCODE_INSTANCE },
  { key: I18nKey.TIPS$SAVE_WORK },
  {
    key: I18nKey.TIPS$SPECIFY_FILES,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
  {
    key: I18nKey.TIPS$HEADLESS_MODE,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
  {
    key: I18nKey.TIPS$CLI_MODE,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
  {
    key: I18nKey.TIPS$GITHUB_HOOK,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
  {
    key: I18nKey.TIPS$BLOG_SIGNUP,
    link: "https://h2loop.ai/",
  },
  {
    key: I18nKey.TIPS$API_USAGE,
    link: "https://code2doc.h2loop.ai/open-sdr/openwifi/a80935d/",
  },
];

export function getRandomTip(): Tip {
  const randomIndex = Math.floor(Math.random() * TIPS.length);
  return TIPS[randomIndex];
}
