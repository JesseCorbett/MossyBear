<template>
  <div class="container">
    <label :for="label">{{ label }}</label>
    <div class="input" :id="label" :style="'--progress:' + ((model / parseInt(max)) * 100) + '%'" @click="setValue">
      {{model}}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  max: string;
}>()

const model = defineModel<number>({ required: true })

function setValue(event: MouseEvent) {
  const target = (event.target as Element).getBoundingClientRect();
  const percent = ((event.clientX - target.left) / target.width) * parseInt(props.max);
  model.value = Math.round(percent);
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

label {
  width: 80px;
  margin: auto auto 0;
  font-size: 20px;
  text-align: center;
}

.input {
  flex: 1;
  font-size: 24px;
  color: var(--theme-primary);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  --progress: 100%;
  user-select: none;
  background: linear-gradient(to right, var(--text-color), var(--text-color) var(--progress, 100%), var(--progress, 100%), var(--accent-color));
}
</style>
