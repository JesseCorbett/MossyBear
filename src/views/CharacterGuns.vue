<template>
  <div id="guns">
    <GunSet v-model="sheet.primary"/>
    <GunSet v-model="sheet.secondary"/>
    <GunSet v-model="sheet.heavy"/>
  </div>
</template>

<script setup lang="ts">
import type { CharacterSheet } from "@/stores/character";
import GunSet from "@/components/GunSet.vue";

const sheet = defineModel<CharacterSheet>({
  required: true
})
</script>

<style scoped>
#guns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  grid-template-rows: auto;
  gap: 32px 16px;
}
</style>
