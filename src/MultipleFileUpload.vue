<template>
    <div class="card">
        <FileUpload
            :multiple="true"
            :custom-upload="true"
            accept="application/pdf"
            class="multiple-file-upload"
            @select="handleSelect"
            @before-upload="handleBeforeUpload"
            @progress="handleProgress"
            @upload="handleUpload"
            @uploader="handleUploader"
            @error="handleError"
            @before-send="handleBeforeSend"
            @clear="handleClear"
            @remove="handleRemove"
            @removeUploadedFile="handleRemoveUploadedFile"
        >
            <template #empty>
                <p>Drag and drop files to here to upload.ss</p>
            </template>
            <template #header="{ chooseCallback }">
                <Button
                    label="Choose"
                    icon="pi pi-plus"
                    :disabled="progressFiles.length"
                    @click="chooseCallback"
                />
                <Button
                    :label="selectedFiles.length ? `Upload(${selectedFiles.length})`: 'Upload'"
                    icon="pi pi-upload"
                    :disabled="!selectedFiles.length || progressFiles.length"
                    @click="handleUploadFiles(selectedFiles)"
                />
                <Button
                    v-if="!progressFiles.length && failedFiles.length"
                    :label="failedFiles.length ? `Retry(${failedFiles.length})`: 'Upload'"
                    icon="pi pi-refresh"
                    @click="handleUploadFiles(failedFiles)"
                />
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    :disabled="!selectedFiles.length || progressFiles.length"
                    @click="handleClearSelectedFiles"
                />
            </template>

            <template #content>
                <!-- Failed files -->
                <div
                    v-for="file in failedFiles"
                    class="multiple-file-upload__item"
                >
                    <div class="multiple-file-upload__item-details">
                        <div class="multiple-file-upload__item-name">
                            {{ file.name }}
                        </div>
                        <div class="multiple-file-upload__item-size">
                            {{ humanFileSize(file.size) }}
                        </div>
                        <div class="multiple-file-upload__item-status">
                            <Badge value="Failed" severity="danger"></Badge>
                        </div>
                    </div>
                    <div class="multiple-file-upload__item-actions">
                        <template v-if="isFileInsideProgressFiles(file)">
                            <Button
                                :disabled="true"
                                icon="pi pi-spinner"
                                icon-class="pi-spin"
                                severity="primary"
                                text
                                rounded
                                aria-label="Loading"
                            />
                        </template>
                        <template v-else>
                            <Button
                                icon="pi pi-refresh"
                                severity="primary"
                                text
                                rounded
                                aria-label="Retry"
                                @click="handleUploadFile(file)"
                            />
                        </template>
                    </div>
                </div>
                <!-- Selected files -->
                <div
                    v-for="file in selectedFiles"
                    class="multiple-file-upload__item"
                >
                    <div class="multiple-file-upload__item-details">
                        <div class="multiple-file-upload__item-name">
                            {{ file.name }}
                        </div>
                        <div class="multiple-file-upload__item-size">
                            {{ humanFileSize(file.size) }}
                        </div>
                        <div class="multiple-file-upload__item-status">
                            <template v-if="isFileInsideProgressFiles(file)">
                                <Badge value="Loading" severity="info"></Badge>
                            </template>
                            <template v-else>
                                <Badge value="Pending" severity="warning"></Badge>
                            </template>
                        </div>
                    </div>
                    <div class="multiple-file-upload__item-actions">
                        <template v-if="isFileInsideProgressFiles(file)">
                            <Button
                                :disabled="true"
                                icon="pi pi-spinner"
                                icon-class="pi-spin"
                                severity="primary"
                                text
                                rounded
                                aria-label="Loading"
                            />
                        </template>
                        <template v-else>
                            <Button
                                icon="pi pi-times"
                                severity="danger"
                                text
                                rounded
                                aria-label="Remove"
                                @click="handleRemoveFromSelectedFiles(file)"
                            />
                        </template>
                    </div>
                </div>
                <!-- Uploaded files -->
                <div
                    v-for="file in uploadedFiles"
                    class="multiple-file-upload__item"
                >
                    <div class="multiple-file-upload__item-details">
                        <div class="multiple-file-upload__item-name">
                            {{ file.name }}
                        </div>
                        <div class="multiple-file-upload__item-size">
                            {{ humanFileSize(file.size) }}
                        </div>
                        <div class="multiple-file-upload__item-status">
                            <Badge value="Completed" severity="success"></Badge>
                        </div>
                    </div>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<script setup>
import {
    ref,
    defineProps,
    defineOptions
} from 'vue';

import Badge from 'primevue/badge';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

defineOptions({
    name: 'MultipleFileUpload',
    inheritAttrs: false
});

const props = defineProps({
    accept: {
        type: String,
        required: false,
        default: 'application/pdf'
    },
    apiFullUrl: {
        type: String,
        required: true
    }
});

const selectedFiles = ref([]);
const progressFiles = ref([]);
const uploadedFiles = ref([]);
const failedFiles = ref([]);

function humanFileSize(bytes = 0) {
    if (bytes === 0) {
        return '0.00 B';
    }
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
}

function handleSelect({ files = [] }) {
    selectedFiles.value = [...files];
}

function randomInteger(min = 0, max = 1) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function isFileInsideProgressFiles(file) {
    return progressFiles.value.find(item => item.name === file.name);
}

function handleRemoveFromSelectedFiles(file) {
    selectedFiles.value = [...selectedFiles.value.filter(item => item.name !== file.name)];
}

function handleClearSelectedFiles() {
    selectedFiles.value = [];
}

function fakeEndpoint(file, isSuccess) {
    console.log('fakeEndpoint file: ', file);
    console.log('fakeEndpoint isSuccess: ', isSuccess);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(file);
            } else {
                reject(file);
            }
        }, randomInteger(2000, 10000));
    });
}

async function handleUploadFile(file) {
    try {
        progressFiles.value = [...progressFiles.value, file];
        await fakeEndpoint(file, randomInteger(0, 4));
        failedFiles.value = [...failedFiles.value.filter(item => item.name !== file.name)];
        uploadedFiles.value = [...uploadedFiles.value, file];
    } catch (e) {
        failedFiles.value = [...failedFiles.value, file];
    } finally {
        selectedFiles.value = [...selectedFiles.value.filter(item => item.name !== file.name)];
        progressFiles.value = [...progressFiles.value.filter(item => item.name !== file.name)];
    }
}

function handleUploadFiles(files = []) {
    if (!files.length) return;

    for (const file of files) {
        handleUploadFile(file);
    }
}

function handleBeforeUpload(...args) {
    console.log('handleBeforeUpload: ', args);
}

function handleUpload(...args) {
    console.log('handleUpload: ', args);
}

function handleUploader({ files }) {
    console.log('apiFullUrl: ', props.apiFullUrl);
    console.log('handleUploader: ', files);
}

function handleBeforeSend(...args) {
    console.log('handleBeforeSend: ', args);
}

function handleProgress(...args) {
    console.log('handleBeforeSend: ', args);
}

function handleError(...args) {
    console.log('handleBeforeSend: ', args);
}

function handleClear(...args) {
    console.log('handleBeforeSend: ', args);
}

function handleRemove(...args) {
    console.log('handleBeforeSend: ', args);
}

function handleRemoveUploadedFile(...args) {
    console.log('handleBeforeSend: ', args);
}
</script>

<style scoped>
.multiple-file-upload__item {
    display: flex;
    align-items: stretch;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.multiple-file-upload__item-details {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
}

.multiple-file-upload__item-name {
    flex: 1 1 100%;
    margin-bottom: 0.5rem;
}

.multiple-file-upload__item-size {
    padding-right: 0.5rem;
}

.multiple-file-upload__item-actions {

}

.multiple-file-upload__item-remove {
    width: 16px;
    height: 16px;
}
</style>
