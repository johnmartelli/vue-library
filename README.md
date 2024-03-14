# vue-library

This is a sample that builds a library that exports three functions: DateTimePicker, ColorPicker, Editor. The library can be included into 
a simple HTML page using an include <script src="dist/my-library.umd.js"></script>. This allows run time dynamic creation of the Vue JS 
component in the browser. The library is built with vite which means there are all the benefits, including a proper proecvt structure 
that allows Vue single file components (SFC) to be used

Issues: Prime vue defines a really invasive CSS that starts with body. This will be an issue in our current application (similar to including bootstrap)
Next steps: 
 - Attempt to pass parameters in the function call
 - (Fixed)Resolve the CSS issue

To test, use the test_library.html file.

Next steps: 

 - work on the document multi upload and the 
 - Autocomplete\Multiple\Multiple mode is enabled using multiple property used to select more than one value from the autocomplete. In this case, value reference should be an array.