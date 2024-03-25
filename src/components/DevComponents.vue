<template>
    <div class="layout">
        <div class="layout__nav">
            <div class="layout__nav-list">
                <a
                    v-for="item in componentsList"
                    :href="`#${item.name}`"
                    :key="item.name"
                    class="layout__nav-list-item"
                >
                    {{ item.name }}
                </a>
            </div>
        </div>
        <div class="layout__content">
            <section
                v-for="item in componentsList"
                :id="item.name"
                :key="item.name"
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
            apiFullUrl: 'https://platform.dev.altamiraweb.com/',
            additionalRequestParams: {
                f: 1,
                a: 2
            }
        }
    },
    { name: 'DateTimePicker', component: DateTimePicker },
    { name: 'ColorPicker', component: ColorPicker },
    { name: 'Editor', component: Editor },
    { name: 'FileUpload', component: FileUpload }
]);

console.log('', import.meta.env.MODE);
</script>

<style>
body {
    margin: 0;
}
</style>

<style scoped>
.layout {
    display: flex;
    position: relative;
}

.layout__nav {
    background: #133268;
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

.layout__content {
    width: 100%;
}

.layout__nav-list-item {
    padding: 14px;
    color: #ffffff;
    text-decoration: none;
}

.layout__nav-list-item:hover {
    background: rgba(255, 255, 255, .15);
}

.layout__content-section {
    padding: 20px 40px 100px 40px;
}

.layout__content-section:nth-child(odd) {
    background: #f6f6f6;
}

.layout__content-section:nth-child(even) {
    background: #ffffff;
}
</style>
