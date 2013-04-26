# interactiveHarp

A jQuery plugin to add the Interactive Harp component. Educational.

Work in progress... 

See demo here: http://zskilz.github.io/interactiveHarp/

Used in <a  href="http://zskilz.blogspot.com/2013/04/intro-to-tonal-harmonic-theory-part-1.html">this blog post</a> to explain the origin of the 12-tone tempered chromatic scale.

Download source (or get the files from https://github.com/zskilz/interactiveHarp/) and copy build/interactiveHarp.js (or the minified version) and src/interactiveHarp.css to your workspace. Add them to your main html file (after the jquery src link).

    <link type="text/css" href="interactiveHarp.css" rel="Stylesheet">
    <script src="interactiveHarp.js"></script>

Calling the plugin:

    $('#testDiv').interactiveHarp();
    
## Dev

src/dev.html is the entry point for development/testing. 
            
## Building.

Almond build scripts are provided in the root. Nodejs required. 
    
    node r.js -o build.js
    node r.js -o build.min.js
    
##Lisence

Copyright &copy; Petrus J Pretorius 2013

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
