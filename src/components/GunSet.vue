<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="title">
          <input class="label" v-model="gun.name" placeholder="Gun Name"/>
          <button class="exp" @click="gun.exp++" @contextmenu.prevent="gun.exp--">{{ gun.exp }}</button>
          <div class="button" @click="rollStat">
            <img alt="dice" width="32" height="32" src="@/assets/dice-accent.svg" />
          </div>
        </div>
        <div class="tag" v-for="(tag, idx) in gun.tags" :key="idx">
          <div class="name">
            <input v-model="tag.name" placeholder="Tag Name"/>
          </div>
          <textarea v-model="tag.description" placeholder="Description"></textarea>
        </div>
        <button @click="gun.tags.push({ name: '', description: '' })">+</button>
      </div>
      <table class="attributes">
        <tr>
          <td>Range</td>
          <td><input v-model="gun.range" placeholder="Range"/></td>
        </tr>
        <tr>
          <td>Type</td>
          <td><input v-model="gun.type" placeholder="Type"/></td>
        </tr>
        <tr>
          <td>DMG</td>
          <td><input v-model="gun.dmg" placeholder="Damage"/></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CharacterGun, type CharacterTag, useCharacterStore } from "@/stores/character";
import OBR from "@owlbear-rodeo/sdk";

const gun = defineModel<CharacterGun>({ required: true });

const characterStore = useCharacterStore()

async function rollStat() {
  const results = Array.from({ length: gun.value.exp }, rollDie)
  let total = 0
  results.forEach((die) => {
    if (die > total) {
      total = die
    }
  })
  await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total} for ${gun.value.name}`)
}

function rollDie() {
  return Math.floor(Math.random() * 4) + 1;
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}

.attributes {
  margin: auto 0 0;
  background: var(--background-primary);
  font-size: 14px;
  border-spacing: 4px;
}

.attributes > tr {
  color: var(--accent-color);
}

.attributes > tr > td:first-child {
  font-weight: bold;
  padding: 0 4px 0 0;
}

.attributes input {
  width: 64px;
  padding: 0;
  outline: none;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  gap: 1px;
}

.title {
  display: flex;
  margin-bottom: -1px;
}

.label {
  background: var(--background-primary);
  padding: 0 16px;
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
}

.title .exp {
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
  color: var(--background-primary);
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag {
  width: 100%;
  background-color: var(--background-primary);
}

.tag .name {
  width: 100%;
  height: 36px;
  background-color: var(--text-color);
  color: var(--background-primary);
  display: flex;
  flex-direction: row;
}

.tag .name input::placeholder {
  color: var(--background-primary);
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
