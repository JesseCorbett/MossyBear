<template>
  <div class="container">
    <label>{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>()

const model = defineModel<[{
  name: string;
  description: string;
  exp: number;
}]>({ required: true })


</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 100px 1fr 75px;
  gap: 1px;
}

.container > * {
  background: var(--theme-primary);
}

label {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

</style>
