<template>
  <ButtonComp
    class="translate-comp"
    :class="{ 'translate-comp--open': isOpenLanguageList }"
    @click="isOpenLanguageList = !isOpenLanguageList"
  >
    <IconTranslate theme="outline" size="24" fill="var(--c-text)" />

    <div class="language-list">
      <ButtonComp
        v-for="language in languageList"
        class="language-item"
        :key="language.value"
        :type="$i18n.locale === language.value ? 'primary' : 'default'"
        @click="setLanguage(language.value)"
      >
        {{ language.label }}
      </ButtonComp>
    </div>
  </ButtonComp>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
// i18n
import i18nInstance from "@/i18n/index";
// Utils
import { localStorage } from "@/utils/localStorage";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
// Icons
import { Translate as IconTranslate } from "@icon-park/vue-next";

defineOptions({ name: "TranslateComp" });

const isOpenLanguageList = ref(false);

const languageList: { label: string; value: "en" | "cn" | "kz" }[] = [
  { label: "English", value: "en" },
  { label: "中文", value: "cn" },
  { label: "Қазақша", value: "kz" },
];

const setLanguage = (language: "en" | "cn" | "kz") => {
  i18nInstance.global.locale.value = language;
  localStorage.set("language", language);
};
</script>

<style scoped lang="scss">
.translate-comp {
  position: relative;

  .language-list {
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    transform: translate(calc(-100% - 8px), -50%);
    transition: var(--transition);
    @include flex($alignItems: center, $gap: 8px);
    @include positioned($top: 50%, $left: 0);

    .language-item {
      width: max-content;
      transform: translateX(100dvw);
      transition: var(--transition);
      @include flex($alignItems: center, $justifyContent: center);
    }
  }

  &--open {
    .language-list {
      opacity: 1;
      pointer-events: auto;

      .language-item {
        transform: translateX(0);
      }
    }
  }
}
</style>
