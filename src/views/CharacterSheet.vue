<template>
  <div id="container">
    <header v-if="currentSheet">
      <div id="summary">
        <input id="character-name" v-model="currentSheet.name"/>
        <div class="summary-stat">
          <label for="health">Health</label>
          <input id="health" v-model="currentSheet.health"/>
        </div>
        <div class="summary-stat">
          <label for="power">Power</label>
          <input id="power" v-model="currentSheet.power"/>
        </div>
      </div>
      <div id="links">
        <RouterLink to="/tags">Tags</RouterLink>
        <RouterLink to="/guns">Guns</RouterLink>
      </div>
    </header>
    <header v-else>
      <h1>Loading...</h1>
    </header>
    <main>
     <div>
       <router-view v-if="currentSheet" v-model="currentSheet"/>
     </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { type CharacterSheet, useCharacterStore } from "@/stores/character";
import { toRefs, watch } from "vue";

const characterStore = useCharacterStore()

const { currentSheet } = toRefs(characterStore)
watch(currentSheet, async (newSheet, oldSheet) => {
  if (newSheet?.id === oldSheet?.id) {
    await characterStore.updateSheet(newSheet as CharacterSheet)
  }
}, { deep: true })
</script>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  flex-direction: row;
}

#summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 20px 16px;
  width: 60%;
}

#character-name {
  background: var(--background-secondary);
  font-size: 32px;
  font-weight: 600;
  grid-column: span 2;
  box-sizing: border-box;
}

.summary-stat {
  grid-column: span 1;
  padding: 2px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-transform: uppercase;
  background: var(--text-color);
}

.summary-stat > * {
  color: var(--theme-primary);
  font-size: 20px;
  flex: 1;
  text-align: center;
  padding: 0;
}

.summary-stat:last-child > * {
  color: var(--theme-secondary);
}

#links {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  padding-right: 16px;
  gap: 8px;
}

#links > a {
  flex: 1;
  background: linear-gradient(to bottom, transparent, transparent 70%, var(--background-secondary) 70%, var(--background-secondary));
  text-transform: uppercase;
  font-size: 16px;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 12px 16px;
  text-align: center;
}

#links > a.router-link-exact-active {
  background: var(--background-secondary);
  text-decoration: underline;
}

main {
  box-sizing: border-box;
  background: var(--background-secondary);
  width: 100%;
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>
