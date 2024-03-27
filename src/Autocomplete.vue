<script>
import Autocomplete from 'primevue/autocomplete';
</script>

<template>
    <Autocomplete v-if="items.length > 0" v-model="selectedItem" multiple :suggestions="filteredItems"
        @complete="search" @change="updateSelectedValues" optionLabel="name" placeholder="Start typing..." />
    <input :id="inputId" :name="inputName" type="hidden" v-model="selectedValues" />
</template>

<script setup>

import { ref, watchEffect, onMounted } from "vue";
import axios from 'axios';

const props = defineProps({
    apiFullUrl: {
        type: String,
        required: true
    },
    inputId: String,
    inputName: String,
    initialValue: String
});
const selectedItem = ref("");
const filteredItems = ref([]);
const selectedValues = ref([]);
const items = ref([]);

const fetchItems = async () => {
    try {
        const response = await axios.get(props.apiFullUrl);
        items.value = response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

onMounted(fetchItems); // Fetch items when component is mounted

const search = (event) => {
    // Search for typed text among items
    filteredItems.value = items.value.filter(item =>
        item['name'].toLowerCase().includes(event.query.toLowerCase())
    );
};

// Update selected values when autocomplete selection changes
const updateSelectedValues = (event) => {
    selectedValues.value = event.value.map(item => item.id);
};

// Watch for changes to initialValue and items array, then update selectedItem
watchEffect(() => {
    if (props.initialValue && items.value.length > 0) {
        selectedValues.value = props.initialValue;
        selectedItem.value = items.value.filter(item => props.initialValue.includes(item.id));
    }
});
</script>