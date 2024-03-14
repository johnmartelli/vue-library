# vue-library

This is a sample that builds a library that exports three functions: DateTimePicker, ColorPicker, Editor. The library can be included into 
a simple HTML page using an include <script src="dist/my-library.umd.js"></script>. This allows run time dynamic creation of the Vue JS 
component in the browser. The library is built with vite which means there are all the benefits, including a proper proecvt structure 
that allows Vue single file components (SFC) to be used

Issues: Prime vue defines a really invasive CSS that starts with body. This will be an issue in our current application (similar to including bootstrap)
Next steps: 
 - Attempt to pass parameters in the function call
 - Resolve the CSS issue

To test, use the test_library.html file.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
