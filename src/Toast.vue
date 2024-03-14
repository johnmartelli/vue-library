

<template>
  <div class="card flex justify-content-center">
      <Toast />
      <Button label="Show" @click="show()" />
  </div>
</template>

<script setup>

import Toast from 'primevue/toast';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { ref } from "vue";

const value = ref();

const toast = useToast();
const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

</script>
