import { createApp, defineCustomElement } from 'vue'
import DateTimePickerSPC from './DateTimePicker.vue'
import ColorPickerSPC from './ColorPicker.vue'
import EditorSPC from './Editor.vue'
import FileUploadSPC from './FileUpload.vue'
import ToastSPC from './Toast.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/aura-light-blue/theme.css'


function DateTimePicker(strID) {
    console.log("Mounting DateTimePicker");
    const app = createApp(DateTimePickerSPC)
    app.use(PrimeVue, { ripple: true });
    app.mount(strID);
}

function ColorPicker(strID) {
    console.log("Mounting ColorPicker");
    const app = createApp(ColorPickerSPC)
    app.use(PrimeVue, { ripple: true });
    app.mount(strID);
}

function Editor(strID) {
    console.log("Mounting Editor");
    const app = createApp(EditorSPC)
    app.use(PrimeVue, { ripple: true });
    app.mount(strID);
}

function FileUpload(strID) {
    console.log("Mounting FileUpload");
    const app = createApp(FileUploadSPC)
    app.use(PrimeVue, { ripple: true });
    app.use(ToastService);
    app.mount(strID);
}

function Toast(strID) {
    console.log("Mounting ToastSPC");
    const app = createApp(ToastSPC)
    app.use(PrimeVue, { ripple: true });
    app.use(ToastService);
    app.mount(strID);
}

window.DateTimePicker = DateTimePicker;
window.ColorPicker = ColorPicker;
window.Editor = Editor;
window.FileUpload = FileUpload;
window.Toast = Toast;


export { DateTimePicker, ColorPicker, Editor, FileUpload,Toast }