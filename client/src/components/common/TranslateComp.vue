<template>
  <ButtonComp
    class="translate-comp"
    :class="{ 'translate-comp--open': isOpenLanguageList }"
    @click="isOpenLanguageList = !isOpenLanguageList"
  >
    <IconTranslate theme="outline" size="16" fill="var(--c-text)" />

    {{ currentLanguage }}

    <IconSwitch
      class="translate-comp__switch"
      theme="outline"
      size="16"
      fill="var(--c-text)"
    />

    <div class="language-list">
      <ButtonComp
        v-for="language in languageList"
        class="language-item"
        :key="language.value"
        @click="setLanguage(language.value)"
      >
        {{ language.label }}
      </ButtonComp>
    </div>
  </ButtonComp>
</template>

<script setup lang="ts">
// Vue
import { ref, computed } from "vue";
// i18n
import i18nInstance from "@/i18n/index";
// Utils
import { localStorage } from "@/utils/localStorage";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
// Icons
import {
  Translate as IconTranslate,
  Switch as IconSwitch,
} from "@icon-park/vue-next";

defineOptions({ name: "TranslateComp" });

const isOpenLanguageList = ref(false);

const languageList: { label: string; value: "en" | "cn" | "kz" }[] = [
  { label: "English", value: "en" },
  { label: "中文", value: "cn" },
  { label: "Қазақша", value: "kz" },
];

const currentLanguage = computed(() => {
  return languageList.find(
    (language) => language.value === i18nInstance.global.locale.value
  )!.label;
});

const setLanguage = (language: "en" | "cn" | "kz") => {
  i18nInstance.global.locale.value = language;
  localStorage.set("language", language);
};
</script>

<style scoped lang="scss">
.translate-comp {
  position: relative;

  .translate-comp__switch {
    margin-inline-start: auto;
  }

  .language-list {
    width: 100%;
    padding: 8px;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    transform: translate(0, 8px);
    transition: var(--transition);
    @include flex($direction: column, $alignItems: center, $gap: 8px);
    @include positioned($top: 100%, $left: 0);

    .language-item {
      width: calc(100% - 8px);
      transform: translateY(-40dvh);
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
