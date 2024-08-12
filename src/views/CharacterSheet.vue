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
        <div id="character-select">
          <select v-model="characterStore.currentSheetId">
            <option v-for="sheet in characterStore.sheets" :key="sheet.id" :value="sheet.id">
              {{ sheet.name }}
            </option>
          </select>
        </div>
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
  gap: 2px;
  padding: 16px 16px;
  width: 60%;
}

#character-name {
  background: var(--theme-primary);
  font-size: 32px;
  font-weight: 600;
  grid-column: span 2;
  box-sizing: border-box;
}

.summary-stat {
  grid-column: span 1;
  padding: 1px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}


.summary-stat > * {
  font-size: 15px;
  flex: 1;
  text-align: center;
  background-color: var(--theme-secondary);
  padding: 5px
}

.summary-stat:last-child > * {
  background-color: var(--theme-tertiary);
}

#links {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  padding-right: 16px;
  gap: 8px;
}

#character-select {
  width: 100%;
  margin: 16px 16px auto auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

#character-select select {
  padding: 6px 8px;
  outline: none;
  border: none;
  background: var(--theme-primary);
  font-weight: bold;
  color: var(--text-color);
}

#links > a {
  flex: 1;
  background: linear-gradient(to bottom, transparent, transparent 70%, var(--theme-primary) 70%, var(--theme-primary));
  text-transform: uppercase;
  font-size: 16px;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 12px 16px;
  text-align: center;
}

#links > a.router-link-exact-active {
  background: var(--theme-primary);
  text-decoration: underline;
}

main {
  box-sizing: border-box;
  border-top: 2px solid var(--theme-primary);
  width: 100%;
  flex: 1;
  padding: 10px 10px;
  overflow: scroll;
  scrollbar-width: none;
}

</style>
