<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import OBR from "@owlbear-rodeo/sdk";
import { signInAnonymously, getAuth } from "firebase/auth"
import { useCharacterStore } from "@/stores/character";

const characterStore = useCharacterStore()

signInAnonymously(getAuth()).then(() => {
  OBR.onReady(async () => {
    characterStore.playerName = await OBR.player.getName();
    characterStore.isGm = (await OBR.player.getRole()) === 'GM';
    characterStore.roomId = OBR.room.id;
    characterStore.playerId = await OBR.player.getId();
    await characterStore.awaitLoading()
    if (!characterStore.isGm || characterStore.playerId === 'd9e53bed-616d-47ad-bc98-eb8a401ae5ba') {
      characterStore.currentSheetId = characterStore.playerId
      if (!characterStore.currentSheet) {
        console.log('Bootstrapping character sheet')
        await characterStore.bootstrapSheet()
      }
    } else {
      characterStore.currentSheetId = characterStore.sheets[0]?.id
    }
    console.log('OBR data loaded')
  });
})
</script>

<style>
 body{
  background-image: url(/src/assets/SYSTEM.svg);
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
 }
 </style>
