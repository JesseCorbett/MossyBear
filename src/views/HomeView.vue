<template>
  <main>
    <div>{{ userId }}</div>
    <input placeholder="get rekt"/>
  </main>
</template>

<script setup lang="ts">
import OBR from "@owlbear-rodeo/sdk";
import { ref } from "vue";

const userId = ref('')

OBR.onReady(async () => {
  userId.value = await OBR.player.getName()
})
</script>
