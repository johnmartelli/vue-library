import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

// Entry components to dev library components
import DevComponents from './components/DevComponents.vue';

// Library components
import DateTimePickerSPC from './DateTimePicker.vue';
import ColorPickerSPC from './ColorPicker.vue';
import EditorSPC from './Editor.vue';
import FileUploadSPC from './FileUpload.vue';
import MultipleFileUploadSPC from './MultipleFileUpload.vue';
import ToastSPC from './Toast.vue';
import AutocompleteSPC from './Autocomplete.vue';

// Styles
import 'primevue/resources/themes/aura-light-blue/theme.css';
import 'primeicons/primeicons.css';

/**
 * @typedef { import('vue').Component } vueComponent
 */

/**
 * @param { string } targetId - HTML target ID (for example '#dtp')
 * @param { vueComponent } component - vue component
 * @param { Object } [props] - initial component props
 */
function initApp(targetId, component, props = {}) {
	const app = createApp(component, props);
	app.use(PrimeVue, { ripple: true });
	app.mount(targetId);
}

function DateTimePicker(targetId, props = {}) {
	initApp(targetId, DateTimePickerSPC, props);
}

function ColorPicker(targetId, props = {}) {
	initApp(targetId, ColorPickerSPC, props);
}

function Editor(targetId, props = {}) {
	initApp(targetId, EditorSPC, props);
}

function MultipleFileUpload(targetId, props = {}) {
	initApp(targetId, MultipleFileUploadSPC, props);
}

function FileUpload(targetId, props = {}) {
	console.log('Mounting FileUpload');
	const app = createApp(FileUploadSPC);
	app.use(PrimeVue, { ripple: true });
	app.use(ToastService);
	app.mount(targetId);
}

function Autocomplete(strID, props = {}) {
    console.log("Mounting Autocomplete");
    const app = createApp(AutocompleteSPC, props)
    app.use(PrimeVue, { ripple: true });        
    app.mount(strID);
}

function Toast(targetId) {
	console.log('Mounting ToastSPC');
	const app = createApp(ToastSPC);
	app.use(PrimeVue, { ripple: true });
	app.use(ToastService);
	app.mount(targetId);
}

window.DateTimePicker = DateTimePicker;
window.ColorPicker = ColorPicker;
window.Editor = Editor;
window.FileUpload = FileUpload;
window.Toast = Toast;
window.Autocomplete = Autocomplete;

if (import.meta.env.MODE === 'development') {
	const app = createApp(DevComponents);
	app.use(PrimeVue, { ripple: true });
	app.use(ToastService);
	app.mount('#app');
}

export {
	DateTimePicker,
	ColorPicker,
	Editor,
	FileUpload,
	Toast,
	MultipleFileUpload,
    Autocomplete
};
