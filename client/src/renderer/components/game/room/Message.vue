<template>
  <div class="message" :class="{ 'is-self': isSelf }">
    <img
      class="sender"
      :src="`/avatar/avatar_${dataSource.data.player.avatarIndex}.jpg`"
    />

    <div class="content">
      <div class="username">
        {{ isSelf ? "我" : dataSource.data.player.username }}
      </div>

      <div class="message-content">
        {{ dataSource.data.content }}
      </div>

      <div class="time">
        {{ formattedTime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_RoomAction } from "@/type-def/Room";

// Vue
import { computed } from "vue";
// Store
import { usePlayerStore } from "@/store/player";

defineOptions({ name: "Message" });

const props = defineProps<{ dataSource: I_RoomAction }>();

const playerStore = usePlayerStore();

const isSelf = computed(() => {
  return props.dataSource.data._id === playerStore.me._id;
});

const formattedTime = computed(() => {
  const date = new Date(props.dataSource.timestamp);

  return date.toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});
</script>

<style scoped lang="scss">
.message {
  @include flex($gap: 16px);

  &.is-self {
    flex-direction: row-reverse;

    .content {
      .username {
        left: auto;
        right: 0;
      }

      &::before {
        left: 100%;
        transform: rotate(180deg);
      }
    }
  }

  .sender {
    --size: 50px;

    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: 50%;
  }

  .content {
    --box-shadow: #000;

    position: relative;
    min-width: 80px;
    max-width: 75%;
    padding: 12px 16px 24px 12px;
    background: #fff;
    box-shadow: 1px 1px 1px 1px var(--box-shadow), 2px 2px 0 0 var(--box-shadow),
      3px 3px 0 0 var(--box-shadow), 4px 4px 0 0 var(--box-shadow),
      5px 5px 0 0 var(--box-shadow);

    .username {
      color: #fff;
      font-size: 12px;

      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      transform: translateY(-100%);
      @include positioned($top: -4px, $left: 0);
    }

    .time {
      font-size: 12px;
      @include positioned($bottom: 4px, $right: 8px);
    }

    &::before {
      --triangle-size: 10px;

      content: "";
      width: 0;
      height: 0;
      border-top: var(--triangle-size) solid transparent;
      border-bottom: var(--triangle-size) solid transparent;
      border-right: var(--triangle-size) solid #fff;
      @include positioned($top: 16px, $left: calc(var(--triangle-size) * -1));
    }
  }
}
</style>
