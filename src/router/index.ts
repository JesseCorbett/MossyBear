import { createRouter, createWebHistory } from 'vue-router'
import CharacterSheet from '../views/CharacterSheet.vue'
import CharacterTags from "@/views/CharacterTags.vue";
import CharacterGuns from "@/views/CharacterGuns.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sheet',
      component: CharacterSheet,
      children: [
        {
          path: 'tags',
          component: CharacterTags
        },
        {
          path: 'guns',
          component: CharacterGuns
        }
      ]
    }
  ]
})

export default router
