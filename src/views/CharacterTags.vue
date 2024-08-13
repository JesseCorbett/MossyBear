<template>
  <div id="tags">
    <StatSet label="Brawn" v-model="sheet.brawn"/>
    <StatSet label="Keen" v-model="sheet.keen" style="--stat-color: var(--theme-secondary)"/>
    <StatSet label="Heart" v-model="sheet.heart"/>
    <StatSet label="Weird" v-model="sheet.weird" style="--stat-color: var(--theme-secondary)"/>
    <div id="diceRolls">
      <button @click="diceRoll(4)"><img alt="dice" width="32" height="32" src="@/assets/d4.svg" /></button>
      <button @click="diceRoll(6)"><img alt="dice" width="32" height="32" src="@/assets/dice-text.svg" /></button>
      <button @click="diceRoll(8)"><img alt="dice" width="32" height="32" src="@/assets/d8.svg" /></button>
      <button @click="diceRoll(12)"><img alt="dice" width="32" height="32" src="@/assets/d12.svg" /></button>
    </div>
    <StatSet label="Fell" v-model="sheet.fell"/>
  </div>
</template>

<script setup lang="ts">
import type { CharacterSheet } from "@/stores/character";
import StatSet from "@/components/StatSet.vue";
import OBR from "@owlbear-rodeo/sdk";
import { type CharacterTag, useCharacterStore } from "@/stores/character";

const sheet = defineModel<CharacterSheet>({
  required: true
})

const characterStore = useCharacterStore()

function diceRoll(type : number){
  let diceString : string | null = window.prompt("🞚 How many dice do you want to roll? 🞚 \n ","1")
  let dice : number = 1;
  if (diceString) {
    dice = parseInt(diceString);
  }
  
  rollStat(dice, type)

}

async function rollStat(amount: number = 0, type: number = 4) {
  const results = Array.from({ length: amount}, () => Math.floor(Math.random() * type) + 1)
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
      lowDie = rollDie(type)
      if (total >= lowDie) {
        total = lowDie
      }
      resultString += ` ${lowDie},`
    }
  }

  resultString = resultString.substring(0, resultString.length-1).concat(` `)
  
  if (resultString.length >= 256) {
    resultString = resultString.substring(0, 200).concat(`...`);
  }

  if ((total == 1) || (total <= 3 && type == 6)) {
      await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total}. [${resultString}]`, "WARNING")
  }else if (total == type) {
      await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total}. [${resultString}]`, "SUCCESS")
  }else {
      await OBR.notification.show(`${characterStore.currentSheet?.name || characterStore.playerName} rolled a ${total}. [${resultString}]`, "DEFAULT")
  }

}

function rollDie(type:number = 6) {
  return Math.floor(Math.random() * type) + 1;
}
</script>

<style scoped>
#tags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  gap: 16px;
  place-content: center;
}

#diceRolls {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  gap: 10px;
  padding: 15px;
}

#diceRolls button {
  height: 36px;
  width: 36px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
}
</style>
