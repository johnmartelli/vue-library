<template>
    <div class="layout">
        <div class="layout__nav-list">
            <a
                v-for="item in componentsList"
                :href="`#${item.name}`"
                class="layout__nav-list-item"
            >
                {{ item.name }}
            </a>
        </div>
        <div class="layout__content">
            <section
                v-for="item in componentsList"
                :id="item.name"
                class="layout__content-section"
            >
                <h2>{{ item.name }}</h2>
                <component
                    :is="item.component"
                    v-bind="item.props || {}"
                />
            </section>
        </div>
    </div>
</template>

<script setup>
// library components
import DateTimePicker from '../DateTimePicker.vue';
import ColorPicker from '../ColorPicker.vue';
import Editor from '../Editor.vue';
import FileUpload from '../FileUpload.vue';
import MultipleFileUpload from '../MultipleFileUpload.vue';

import { ref } from 'vue';

const componentsList = ref([
    {
        name: 'MultipleFileUpload',
        component: MultipleFileUpload,
        props: {
            apiFullUrl: 'https://platform.dev.altamiraweb.com/'
        }
    },
    { name: 'DateTimePicker', component: DateTimePicker },
    { name: 'DateTimePicker', component: DateTimePicker },
    { name: 'ColorPicker', component: ColorPicker },
    { name: 'Editor', component: Editor },
    { name: 'FileUpload', component: FileUpload }
]);

console.log('', import.meta.env.MODE);
</script>

<style scoped>
.layout {
    display: flex;
    gap: 20px;
    position: relative;
    align-items: flex-start;
}

.layout__nav-list {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
}

.layout__nav-list-item {
    padding: 14px;
    border-radius: 4px;
    border: 1px solid lightgrey;
    color: #222222;
}

.layout__nav-list-item:hover {
    border: 1px solid #222222;
}

.layout__content-section {
    padding: 20px 20px 60px 20px;
    margin-bottom: 40px;
    border: 1px solid lightgrey;
    border-radius: 4px;
}
</style>
