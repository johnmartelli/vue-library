<script>
import Editor from 'primevue/editor';
</script>

<template>
  Editor!
  <Editor v-model="value" />
</template>

<script setup>

import { ref } from "vue";

const value = ref();

</script>
