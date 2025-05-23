<template>
  <div class="notification">
    <div class="notification__content">
      {{ notificationContent }}
    </div>
    <div class="notification__time">{{ notificationTime }}</div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_RoomAction } from "@/type-def/Room";

// Vue
import { computed } from "vue";
// Store
import { usePlayerStore } from "@/store/player";

defineOptions({ name: "Notification" });

const props = defineProps<{ dataSource: I_RoomAction }>();

const playerStore = usePlayerStore();

const notificationContent = computed(() => {
  switch (props.dataSource.type) {
    case "playerJoined":
      if (props.dataSource.data._id === playerStore.me._id) {
        return "你加入了房间";
      }
      return `${props.dataSource.data.username} 加入了房间`;
    case "playerLeft":
      return `${props.dataSource.data.username} 离开了房间`;
    default:
      return "未知通知";
  }
});

const notificationTime = computed(() => {
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
.notification {
  @include flexCenter($direction: column, $gap: 4px);

  &__content {
    color: #fff;
  }

  &__time {
    color: #fff;
    font-size: 12px;
  }
}
</style>
