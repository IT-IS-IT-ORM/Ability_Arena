<template>
  <ul class="navbarList" :class="{ 'navbarList--open': isOpen }">
    <li v-for="item in navbarItems" class="navbarItem" :key="item.to">
      <ButtonComp @click="$router.push(item.to)">
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
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
import TranslateComp from "@/components/common/TranslateComp.vue";
// Icons
import IconGame from "@/components/icons/Game.svg";
import IconWiki from "@/components/icons/Wiki.svg";
import IconSettings from "@/components/icons/Settings.svg";

defineOptions({ name: "Navbar" });

defineProps<{ isOpen: boolean }>();

const navbarItems = [
  {
    to: "/games",
    icon: IconGame,
    text: "Navigator__games",
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

  @media screen and (max-width: 992px) {
    width: max-content;
    padding: 8px 12px 12px 8px;
    gap: 8px;

    border-radius: 8px;
    background-color: #fff;

    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
    transition: var(--transition);
    @include positioned($top: calc(100% + 8px), $right: 24px);

    &--open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .navbarItem {
      list-style: none;
      padding: 0;
    }
  }

  @media screen and (max-width: 576px) {
    right: 8px;
  }
}

.navbarItem {
  padding: 16px 24px;

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }

  :deep(.button-comp) {
    width: calc(250px - 24px * 2);

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
