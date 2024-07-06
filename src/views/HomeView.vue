<template>
  <main v-if="character">
    <div>
      <div id="name-container">
        <label for="character-name">Name</label>
        <input
            id="character-name"
            v-model="character.name"
            @blur="setDoc(charDoc!, { name: ($event.target as any).value }, { merge: true })"
        />
      </div>
      <label for="desc">Description</label>
      <textarea
          id="desc"
          v-model="character.description"
          @blur="setDoc(charDoc!, { description: ($event.target as any).value }, { merge: true })"
      ></textarea>
    </div>

    <div>
      <label for="inventory">Inventory, Notes, etc</label>
      <textarea
          id="inventory"
          v-model="character.inventory"
          @blur="setDoc(charDoc!, { inventory: ($event.target as any).value }, { merge: true })"
      ></textarea>
    </div>
  </main>
  <main v-else>
    <h1>Loading...</h1>
  </main>
</template>

<script setup lang="ts">
import OBR from "@owlbear-rodeo/sdk";
import { computed, ref, watch } from "vue";
import { useDocument, useFirestore } from "vuefire";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { signInAnonymously, getAuth } from "firebase/auth"

const roomId = ref<string>()
const playerId = ref<string>()

signInAnonymously(getAuth()).then(() => {
  OBR.onReady(async () => {
    roomId.value = OBR.room.id;
    playerId.value = await OBR.player.getId()
  });
});

const db = useFirestore()

const charDoc = computed(() => {
  if (!roomId.value || !playerId.value) return;
  return doc(collection(db, 'rooms/' + OBR.room.id + '/characters'), OBR.player.id)
})

watch(charDoc, async (newDoc) => {
  if (newDoc) {
    const ref = await getDoc(newDoc)
    if (!ref.exists()) {
      await setDoc(newDoc, {
        createdAt: new Date().toISOString()
      })
    }
  }
})

const character = useDocument(charDoc, {  })
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
}

main > div {
  min-width: 350px;
}

#name-container {
  padding: 0 50px 8px 0;
}

#character-name {
  background: var(--background-primary);
  font-size: 32px;
  font-weight: 500;
  text-align: center;
}

#desc, #inventory {
  background: var(--background-primary);
}

#inventory {
  height: 122px;
}
</style>
