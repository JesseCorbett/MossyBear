<template>
  <div>{{sheet}}</div>
</template>

<script setup lang="ts">
import type { CharacterSheet } from "@/stores/character";

const sheet = defineModel<CharacterSheet>()
</script>

<style scoped>

</style>
