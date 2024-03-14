import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import DateTimePickerSPC from './DateTimePicker.vue'
import ColorPickerSPC from './ColorPicker.vue'
import EditorSPC from './Editor.vue'
import PrimeVue from 'primevue/config';
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

window.DateTimePicker = DateTimePicker;
window.ColorPicker = ColorPicker;
window.Editor = Editor;


export { DateTimePicker, ColorPicker, Editor }