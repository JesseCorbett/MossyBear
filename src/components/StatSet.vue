<template>
  <div class="container">
    <div class="title">
      <div class="label">{{ label }}</div>
      <div class="button" @click="rollStat()" style="background-color: var(--background-primary)">
        <img alt="dice" width="32" height="32" src="@/assets/dice-text.svg" />
      </div>
    </div>
    <div class="tag" v-for="(tag, idx) in model" :key="idx">
      <div class="name">
        <input v-model="tag.name" placeholder="Tag Name"/>
        <button class="exp" @click="tag.exp++" @contextmenu.prevent="tag.exp--">{{ tag.exp }}</button>
        <div class="button" @click="rollStat(tag.exp, tag.name)">
          <img alt="dice" width="32" height="32" src="@/assets/dice-accent.svg" />
        </div>
      </div>
      <textarea v-model="tag.description" placeholder="Description"></textarea>
    </div>
    <button @click="model.push({ name: '', description: '', exp: 1 })">+</button>
  </div>
</template>

<script setup lang="ts">
import { type CharacterTag, useCharacterStore } from "@/stores/character";
import OBR from "@owlbear-rodeo/sdk";

const props = defineProps<{
  label: string;
}>()

const model = defineModel<CharacterTag[]>({ required: true });

const characterStore = useCharacterStore()

async function rollStat(stat: number = 0, label: string = props.label) {
  const results = Array.from({ length: model.value.length + stat }, rollDie)
  let total = 0
  results.forEach((die) => {
    if (die > total) {
      total = die
    }
  })
  await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total} for ${label}`)
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
</script>

<style scoped>
.container {
  --stat-color: var(--theme-primary);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  gap: 1px;
}

.title {
  display: flex;
}

.label {
  background: var(--stat-color);
  padding: 0 16px;
  margin-left: auto;
  width: fit-content;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
}

.tag {
  width: 100%;
  background-color: var(--stat-color);
}

.tag .name {
  width: 100%;
  height: 36px;
  background-color: var(--text-color);
  display: flex;
  flex-direction: row;
}

.tag textarea {
  display: block;
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
  height: 10px;
  min-height: 10px;
  transition: min-height 0.1s ease;
}

.tag > div > * {
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--stat-color);
  font-size: 16px;
  font-weight: 400;
}

.tag input {
  flex: 1;
  padding: 0 16px;
}

.tag input:focus {
  outline: none;
  background: var(--accent-color);
}

.tag .exp {
  width: 36px;
  height: 36px;
  background-color: var(--accent-color);
  font-size: 18px;
  border-left: 1px var(--text-color) solid;
}

.container button {
  height: 36px;
  border: none;
  outline: none;
  background: var(--text-color);
  color: var(--stat-color);
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.tag .name:has(input:hover) + textarea,
.tag .name:has(input:focus) + textarea,
.tag textarea:hover,
.tag textarea:active,
.tag textarea:focus {
  min-height: 60px;
  height: fit-content;
}
</style>
