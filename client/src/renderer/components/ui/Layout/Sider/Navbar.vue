<template>
  <ul class="navbarList" :class="{ 'navbarList--open': isOpen }">
    <li v-for="item in navbarItems" class="navbarItem" :key="item.to">
      <ButtonComp @click="handleItemClick(item.to)">
        <img :src="item.icon" alt="icon" />
        {{ $t(item.text) }}
      </ButtonComp>
    </li>
    <li class="navbarItem">
      <TranslateComp />
    </li>
  </ul>
</template>

<script setup lang="ts">
// Router
import { useRouter } from "vue-router";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
import TranslateComp from "@/components/shared/TranslateComp.vue";
// Icons
import IconGame from "@/components/icons/Game.svg";
import IconWiki from "@/components/icons/Wiki.svg";
import IconSettings from "@/components/icons/Settings.svg";

defineOptions({ name: "Navbar" });

const isOpen = defineModel<boolean>("isOpen");

const router = useRouter();

const handleItemClick = (to: string) => {
  isOpen.value = false;
  router.push(to);
};

const navbarItems = [
  {
    to: "/hall",
    icon: IconGame,
    text: "Navigator__game",
  },
  {
    to: "/wiki",
    icon: IconWiki,
    text: "Navigator__wiki",
  },
  {
    to: "/settings",
    icon: IconSettings,
    text: "Navigator__settings",
  },
];
</script>

<style scoped lang="scss">
.navbarList {
  @include flex($direction: column);
}

.navbarItem {
  list-style: none;
  padding: 16px 24px;

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }

  img[alt="icon"] {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  :deep(.button-comp) {
    width: calc(250px - 24px * 2);
    height: 48px;
    font-size: 20px;

    svg {
      flex: 0 0 auto;
      @include svgStyle;
    }

    .button-comp__content {
      @include flex(
        $justifyContent: flex-start,
        $alignItems: center,
        $gap: 8px
      );
    }
  }
}
</style>
