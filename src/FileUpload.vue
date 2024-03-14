<template>
  <div class="card">
    <Toast />
    <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="application/pdf"
      :maxFileSize="1000000">
      <template #empty>
        <p>Drag and drop files to here to upload.ss</p>
      </template>
      <template #itemTemplate="{file}">
      <div class="p-d-flex p-ai-center">
        <i class="pi pi-file-pdf" style="font-size: 2em;"></i>
        <div class="p-ml-3">
          <div>{{ file.name }}</div>
          <div>{{ file.size }} bytes</div>
        </div>
      </div>
    </template>
    </FileUpload>
  </div>
</template>


<script setup>
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

</script>
