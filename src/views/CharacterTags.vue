<template>
  <div id="tags">
    <StatSet label="Brawn" v-model="sheet.brawn"/>
    <StatSet label="Keen" v-model="sheet.keen" style="--stat-color: var(--theme-secondary)"/>
    <StatSet label="Heart" v-model="sheet.heart"/>
    <StatSet label="Weird" v-model="sheet.weird" style="--stat-color: var(--theme-secondary)"/>
    <StatSet label="Fell" v-model="sheet.fell"/>
  </div>
</template>

<script setup lang="ts">
import type { CharacterSheet } from "@/stores/character";
import StatSet from "@/components/StatSet.vue";

const sheet = defineModel<CharacterSheet>({
  required: true
})
</script>

<style scoped>
#tags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  gap: 16px;
}
</style>
