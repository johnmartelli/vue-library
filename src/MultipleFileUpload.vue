<template>
    <FileUpload
        :multiple="true"
        :custom-upload="true"
        :accept="accept"
        class="multiple-file-upload"
        @select="handleSelect"
    >
        <template #empty>
            <p v-if="!selectedFiles.length && !progressFiles.length && !uploadedFiles.length && !failedFiles.length">
                Drag and drop files to here to upload.ss
            </p>
        </template>
        <template #header="{ chooseCallback, clearCallback }">
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
                @click="handleUploadFiles(selectedFiles, clearCallback)"
            />
            <Button
                v-if="!progressFiles.length && failedFiles.length"
                :label="failedFiles.length ? `Retry(${failedFiles.length})`: 'Upload'"
                icon="pi pi-refresh"
                @click="handleUploadFiles(failedFiles, clearCallback)"
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                :disabled="!selectedFiles.length || progressFiles.length"
                @click="handleClearSelectedFiles(clearCallback)"
            />
        </template>

        <template #content="{ files, removeFileCallback, progress, removeUploadedFileCallback }">
            <ProgressBar
                v-if="progressFiles.length"
                mode="indeterminate"
                class="multiple-file-upload__progress-bar"
            />
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
                            @click="handleRemoveFromSelectedFiles(file, files, removeFileCallback)"
                        />
                    </template>
                </div>
            </div>
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
                            @click="handleUploadFile(file, files, removeFileCallback)"
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
                        <Badge value="Uploaded" severity="success"></Badge>
                    </div>
                </div>
            </div>
        </template>
    </FileUpload>
</template>

<script setup>
import {
    ref,
    defineOptions
} from 'vue';
import axios from 'axios';

import Badge from 'primevue/badge';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import ProgressBar from 'primevue/progressbar';

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
    },
    additionalRequestParams: {
        type: Object,
        default: () => ({})
    },
    requestHeaders: {
        type: Object,
        default: () => ({})
    },
    tagName: {
        type: String,
        default: 'file'
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

function isFileInsideProgressFiles(file) {
    return progressFiles.value.find(item => item.name === file.name);
}

function handleRemoveFromSelectedFiles(file, files, removeFileCallback) {
    const index = files.findIndex(item => item.name === file.name);
    selectedFiles.value = [...selectedFiles.value.filter(item => item.name !== file.name)];
    if (index !== -1) {
        removeFileCallback(index);
    }
}

function handleClearSelectedFiles(clearCallback) {
    selectedFiles.value = [];
    clearCallback?.();
}

async function apiRequest(file) {
    try {
        const base64 = await convertFileToToBase64(file);
        const data = {
            data: [{
                [props.tagName]: base64,
                ...props.additionalRequestParams
            }]
        };

        return axios.put(props.apiFullUrl, data, props.requestHeaders);
    } catch (error) {
        return error;
    }
}

function convertFileToToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    })
}

async function handleUploadFile(file, files = [], removeFileCallback = () => {}) {
    try {
        progressFiles.value = [...progressFiles.value, file];
        await apiRequest(file);
        failedFiles.value = [...failedFiles.value.filter(item => item.name !== file.name)];
        uploadedFiles.value = [...uploadedFiles.value, file];
    } catch (e) {
        failedFiles.value = [...failedFiles.value.filter(item => item.name !== file.name)];
        failedFiles.value = [...failedFiles.value, file];
    } finally {
        selectedFiles.value = [...selectedFiles.value.filter(item => item.name !== file.name)];
        progressFiles.value = [...progressFiles.value.filter(item => item.name !== file.name)];
        const index = files.findIndex(item => item.name === file.name);
        if (index !== -1) {
            removeFileCallback(index);
        }
    }
}

function handleUploadFiles(files = [], clearCallback) {
    if (!files.length) return;

    for (const file of files) {
        handleUploadFile(file);
    }

    clearCallback?.();
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

.multiple-file-upload__progress-bar {
    height: 6px;
}
</style>
