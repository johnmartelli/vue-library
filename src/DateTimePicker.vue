<script>
import Calendar from 'primevue/calendar'
</script>

<template>
        
  Calendar!
  <Calendar v-model="date" />
</template>

<script setup>

import { ref } from "vue";

const date = ref();

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