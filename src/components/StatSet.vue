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
        <input v-model="tag.name" placeholder="Tag Name" @contextmenu.prevent="deleteTag(idx, tag.name)"/>
        <button class="exp" @click="tag.exp++" @contextmenu.prevent="tag.exp--">{{ tag.exp }}</button>
        <div class="button" @click="rollStat(tag.exp, tag.name)">
          <img alt="dice" width="32" height="32" src="@/assets/dice-accent.svg" />
        </div>
      </div>
      <textarea v-model="tag.description" placeholder="Description"></textarea>
    </div>
    <button class="add-button" @click="model.push({ name: '', description: '', exp: 1 })">+</button>
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
  let resultString = ``
  results.forEach((die) => {
    if (die > total) {
      total = die

    }
    resultString += ` ${die},`
  })

  if (total <= 0) { // Roll twice take lower
    let lowDie = 6
    total = 6
    for (let i = 0; i <= 1; i++) {
      lowDie = rollDie()
      if (total >= lowDie) {
        total = lowDie
      }
      resultString += ` ${lowDie},`
    }
  }

  resultString = resultString.substring(0, resultString.length-1).concat(` `)

  if (total <= 3) {
      await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total} for ${label}. [${resultString}]`, "WARNING")
  }else if (total == 6) {
      await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total} for ${label}. [${resultString}]`, "SUCCESS")
  }else {
      await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total} for ${label}. [${resultString}]`, "DEFAULT")
  }

}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function deleteTag(index: number, name: string) {
  if (window.confirm(`This will delete the tag \"${name}\" forever with no way to restore it! Are you sure?`)) {
    model.value.splice(index, 1)
  }
}

</script>

<style scoped>
.container {
  --stat-color: var(--theme-tertiary);
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  gap: 1px;
}

.container:last-child {
  grid-column: 3;
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
}

.tag .name {
  width: 100%;
  height: 36px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) -25%, var(--stat-color) 66%);
  display: flex;
  flex-direction: row;
  border-bottom: thin solid var(--stat-color);
}

.tag textarea {
  display: block;
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
  height: 5px;
  min-height: 5px;
  transition: all 0.15s ease-out;
  background-color: var(--background-second);
  font-family: Roboto, sans-serif;
  font-size: 85%;
  scrollbar-width: thin;
  scrollbar-color: var(--stat-color) var(--background);
}

.tag textarea:focus {
  outline: var(--text-color) solid thin;
  outline-offset: -1px;
}

.tag > div > * {
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
}

.tag input {
  flex: 1;
  padding: 0 16px;
}

.tag input:focus {
  outline: none;
  background: var(--stat-color);
}

.tag .exp {
  width: 35px;
  height: 35px;
  background-color: var(--stat-color);
  font-size: 18px;
  margin-top: 1px;
  border-right: 1px var(--text-color) solid;
}

.tag .exp:hover {
  background-color: var(--background);
}

.container button {
  height: 36px;
  width: 36px;
  border: none;
  outline: none;
  background-color: var(--background-second);
  color: var(--text-color);
  font-size: 30px;
  align-content: center;
  margin-bottom: -45px;
  margin-top: -2px;
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
  min-height: 100px;
  transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.125);
}

.add-button {
  z-index: 1;
}
</style>
