<template>
  <div class="room">
    <div class="room-header">
      <h3>{{ room.name }}</h3>
      <p>房主: {{ room.creator }}</p>
      <p>成员数: {{ room.members.length }}</p>
      <p>状态: {{ room.status }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_Room } from "@/type-def/Room";

defineOptions({ name: "Room" });

defineProps<{ room: I_Room }>();
</script>

<style scoped lang="scss">
.room {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
}
</style>
