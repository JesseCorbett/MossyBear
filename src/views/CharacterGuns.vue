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
  gap: 50px 16px;
  padding: 10px;
}

#inventory {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#inventory label {
  display: block;
  margin: 0 0 0 auto;
  background: var(--theme-tertiary);
  padding: 6px 12px;
  font-size: 18px;
  font-weight: 600;
}

#inventory textarea {
  display: block;
  width: 100%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  background-color: var(--background-second);
  font-family: Roboto, "sans serif";
  font-size: 85%;
  scrollbar-width: thin;
  scrollbar-color: var(--theme-tertiary) var(--background-second);
}

#inventory textarea:focus {
  outline: var(--theme-primary) solid thin;
  outline-offset: -1px;
}
</style>
