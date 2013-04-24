=== interactiveHarp

A jQuery plugin to add the Interactive Harp component. Educational.

Work in progress... 

See demo here: http://zskilz.github.io/interactiveHarp/

Used in <a  href="http://zskilz.blogspot.com/2013/04/intro-to-tonal-harmonic-theory-part-1.html">this blog post</a> to explain the origin of the 12-tone tempered chromatic scale.

Download source (or get the files from https://github.com/zskilz/interactiveHarp/) and copy build/interactiveHarp.js (or the minified version) and src/interactiveHarp.css to your workspace. Add them to your main html file (after the jquery src link).

    <link type="text/css" href="interactiveHarp.css" rel="Stylesheet">
    <script src="interactiveHarp.js"></script>

Calling the plugin:

    $('#testDiv').interactiveHarp();
    
== Dev

src/dev.html is the entry point for development/testing. 
            
== Building.

Almond build scripts are provided in the root. Nodejs required. 
    
    node r.js -o build.js
    node r.js -o build.min.js

