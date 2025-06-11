import { createI18n } from "vue-i18n";
import en from "@/i18n/locales/en.json";
import cn from "@/i18n/locales/cn.json";
import kz from "@/i18n/locales/kz.json";

export default createI18n({
  locale: "en",
  legacy: false,
  messages: {
    en,
    cn,
    kz,
  },
  silentFallbackWarn: true,
  silentTranslationWarn: true,
});
