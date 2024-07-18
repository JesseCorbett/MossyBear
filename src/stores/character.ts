import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollection, useFirestore } from "vuefire";
import { collection, doc, setDoc } from "firebase/firestore";

export interface CharacterTag {
  name: string;
  description: string;
  exp: number;
}

export interface CharacterSheet {
  createdAt: string;
  health: number;
  power: number;
  name: string;
  inventory: string;
  heart: CharacterTag[];
  weird: CharacterTag[];
  keen: CharacterTag[];
  fell: CharacterTag[];
  brawn: CharacterTag[];
}

export const useCharacterStore = defineStore('characters', () => {
  const roomId = ref<string>()
  const isGm = ref<boolean>(false)
  const playerId = ref<string>()
  const playerName = ref<string>()

  const currentSheetId = ref<string>()

  const db = useFirestore()
  const roomCollection = computed(() => {
    if (roomId.value) {
      return collection(db, 'rooms/' + roomId.value + '/characters')
    } else {
      return null;
    }
  })
  const sheets = useCollection<CharacterSheet>(roomCollection)
  const currentSheet = computed(() => {
    return sheets.value.find(sheet => sheet.id === currentSheetId.value)
  })
  async function awaitLoading() {
    await sheets.promise.value
  }

  let timeoutId: unknown
  async function updateSheet(sheet: CharacterSheet) {
    clearTimeout(timeoutId as number | undefined)
    console.log('Queuing update')
    timeoutId = setTimeout(async () => {
      if (!roomId.value || !currentSheetId.value || !roomCollection.value) return;
      console.log('Performing update')
      const charDoc = doc(roomCollection.value, currentSheetId.value)
      await setDoc(charDoc, sheet)
    }, 1000)
  }

  async function bootstrapSheet() {
    if (!roomCollection.value || !currentSheetId.value) return
    const charDoc = doc(roomCollection.value, currentSheetId.value)
    const newSheet: CharacterSheet = {
      createdAt: new Date().toISOString(),
      health: 10,
      power: 10,
      name: playerName.value || '',
      inventory: '',
      heart: [],
      weird: [],
      keen: [],
      fell: [],
      brawn: []
    }
    await setDoc(charDoc, newSheet)
  }

  return {
    roomId,
    isGm,
    playerId,
    playerName,
    sheets,
    currentSheetId,
    currentSheet,
    bootstrapSheet,
    updateSheet,
    awaitLoading
  }
})
