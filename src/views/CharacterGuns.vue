<template>
  <div id="guns">
    <GunSet v-model="sheet.primary"/>
    <GunSet v-model="sheet.secondary"/>
    <GunSet v-model="sheet.heavy"/>
    <div id="inventory">
      <label for="inventory-input">Inventory</label>
      <textarea v-model="sheet.inventory" id="inventory-input"></textarea>
    </div>
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

#inventory {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#inventory label {
  display: block;
  margin: 0 0 0 auto;
  background: var(--theme-secondary);
  padding: 6px 12px;
  font-size: 18px;
  font-weight: 600;
}

#inventory textarea {
  display: block;
  background: var(--theme-secondary);
  width: 100%;
  flex: 1;
  min-height: 120px;
  box-sizing: border-box;
}
</style>
