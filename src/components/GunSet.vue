<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="title">
          <input class="label" v-model="gun.name" placeholder="Gun Name"/>
          <button class="exp" @click="gun.exp++" @contextmenu.prevent="gun.exp--">{{ gun.exp }}</button>
          <div class="button" @click="rollStat" @contextmenu.prevent="cycleDice(gun)">
            <img alt="dice" width="32" height="32" :src='"/src/assets/d"+gun.dice+".svg"'/>
          </div>
        </div>
        <div class="tag" v-for="(tag, idx) in gun.tags" :key="idx">
          <div class="name">
            <input v-model="tag.name" @contextmenu.prevent="deleteTag(tag.name, gun)" placeholder="Tag Name"/>
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
import type { ModelRef } from "vue";

const gun = defineModel<CharacterGun>({ required: true });

const characterStore = useCharacterStore()

async function rollStat() {
  const results = Array.from({ length: gun.value.exp }, rollDie.bind(null, gun.value.dice))
  let total = 0
  results.forEach((die) => {
    if (die > total) {
      total = die
    }
  })
  await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total} for ${gun.value.name}`)
}

function rollDie(value: number) {
  return Math.floor(Math.random() * value) + 1;
}

async function cycleDice(theGun: CharacterGun) {
  switch (theGun.dice) {
    case 4:
      theGun.dice = 8
    break

    case 8:
      theGun.dice = 12
    break

    case 12:
      theGun.dice = 4
    break

    default:
      theGun.dice = 4
    break
  }
}

function deleteTag(name: string = ``, gun: CharacterGun) {
  let deleteIndex;
  deleteIndex = gun.tags.findIndex((item) => {
    return item.name == name
    })
    let result = window.confirm(`This will delete the tag \"${name}\" forever with no way to restore it! Are you sure?`)

    if (result) {
      gun.tags.splice(deleteIndex,1)
    }

  }

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}

.attributes {
  margin: auto 0 0;
  background: var(--background);
  font-size: 14px;
  border-spacing: 4px;
}

.attributes > tr {
  color: var(--theme-tertiary);
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
  background: var(--background);
  padding: 0 16px;
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}

.label:focus {
  outline: none;
}

.title .exp {
  width: 35px;
  height: 35px;
  background-color: var(--theme-secondary);
  font-size: 18px;
  margin-top: 1px;
  border-right: 1px var(--text-color) solid;
}

.container button {
  height: 36px;
  width: 36px;
  border: none;
  outline: none;
  background-color: var(--theme-secondary);
  color: var(--text-color);
  font-size: 30px;
  #display: flex;
  align-content: center;
  margin-bottom: -45px;
  margin-top: -2px;
}

.tag {
  width: 100%;
}

.tag .name {
  width: 100%;
  height: 36px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) -25%, var(--theme-secondary) 66%);
  display: flex;
  flex-direction: row;
  border-bottom: thin solid var(--background-second);
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
  font-family: Roboto, "sans serif";
  font-size: 85%;
  scrollbar-width: thin;
  scrollbar-color: var(--background-second) var(--background);
}

.tag textarea:focus {
  outline: var(--background-second) solid thin;
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
  background: var(--theme-secondary);
}

.tag .exp {
  width: 35px;
  height: 35px;
  background-color: var(--theme-secondary);
  font-size: 18px;
  margin-top: 1px;
  border-right: 1px var(--text-color) solid;
}

.tag .exp:hover {
  background-color: var(--background);
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
  height: fit-content;
  transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.125);
}
</style>
