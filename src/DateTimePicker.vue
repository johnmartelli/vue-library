<script>
import Calendar from 'primevue/calendar';
</script>

<template>
    <Calendar
        v-model="date"
        :selection-mode="selectionMode"
        :inline="inline"
    />
</template>

<script setup>

import { ref, watch } from 'vue';

const props = defineProps(['selectionMode', 'inline', 'initialValue']);
const emit = defineEmits(['update:modelValue']);
const date = ref();

watch(() => props.initialValue, value => {
    if (value) {
        date.value = value;
    }
}, { immediate: true })
</script>


<!--
<script setup>

import { ref } from "vue";

const date = ref();

</script>


<script>
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar'
import 'primevue/resources/themes/aura-light-green/theme.css'
import { defineComponent } from "vue";
import { getCurrentInstance } from 'vue'

export default {
   name: 'App',
   components: {
     'v-calendar' : Calendar
   },
   data() {
     return {
     };
   },
   mounted() {
    const app = getCurrentInstance()
    console.log('mio' + app) // This will log the current instance of the application
  }
 };

  const App = getCurrentInstance();
  console.log('mio' + App);
  //App.use(PrimeVue);

</script>
-->
