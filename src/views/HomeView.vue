<template>
  <main v-if="character">
    <div>
      <div id="name-container">
        <label for="character-name">Name</label>
        <input
            id="character-name"
            v-model="character.name"
            @blur="updateField('name', ($event.target as any).value )"
        />
      </div>
      <label for="desc">Description</label>
      <textarea
          id="desc"
          v-model="character.description"
          @blur="updateField('description', ($event.target as any).value )"
      ></textarea>
      <SliderInput
          label="Health"
          :max="character.maxHealth"
          v-model="character.health"
          @update:modelValue="updateField('health', $event )"
      />
      <div class="max-field">
        <label for="max-health">max</label>
        <input
            id="max-health"
            v-model="character.maxHealth"
            type="number"
            @blur="updateField('maxHealth', ($event.target as any).value)"
        />
      </div>
      <SliderInput
          label="Power"
          :max="character.maxPower"
          v-model="character.power"
          @update:modelValue="updateField('power', $event )"
      />
      <div class="max-field">
        <label for="max-power">max</label>
        <input
            id="max-power"
            v-model="character.maxPower"
            type="number"
            @blur="updateField('maxPower', ($event.target as any).value)"
        />
      </div>
    </div>

    <div>
      <label for="inventory">Inventory, Notes, etc</label>
      <textarea
          id="inventory"
          v-model="character.inventory"
          @blur="updateField('inventory', ($event.target as any).value )"
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
import SliderInput from "@/components/SliderInput.vue";

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

async function updateField(field: string, value: any) {
  const patch: any = {}
  patch[field] = value
  await setDoc(charDoc.value!, patch, { merge: true })
}

watch(charDoc, async (newDoc) => {
  if (newDoc) {
    const ref = await getDoc(newDoc)
    if (!ref.exists()) {
      await setDoc(newDoc, {
        createdAt: new Date().toISOString(),
        health: 10,
        maxHealth: 10,
        power: 10,
        maxPower: 10
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

.max-field {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
  padding: 6px 0 12px;
  gap: 10px;
}

.max-field input {
  width: 40px;
  text-align: end;
}
</style>
