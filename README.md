=== interactiveHarp

A jQuery plugin to add the Interactive Harp component. Educational.

Work in progress... See demo here: http://zskilz.github.io/interactiveHarp/

Download build/interactiveHarp.js (or the minified version) and src/interactiveHarp.css. Include them in your page.

    <link type="text/css" href="src/interactiveHarp.css" rel="Stylesheet">
    <script src="interactiveHarp.js"></script>

Calling the plugin:

    $('#testDiv').interactiveHarp({});
    
== Dev

src/dev.html is the entry point for development/testing. 
            
== Building.

Almond build scripts are provided in the root. Nodejs required. 
    
    node r.js -o build.js
    node r.js -o build.min.js