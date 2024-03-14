<script>
import ColorPicker from 'primevue/colorpicker';
</script>

<template>

  Color picker!
  <ColorPicker v-model="color" />
</template>

<script setup>

import { ref } from "vue";

const color = ref();

</script>
