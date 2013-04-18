({
    appDir: "src",
    baseUrl: "src",
    dir: "build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS.
    optimize: "none",

    paths: {
        "jquery": "http://code.jquery.com/jquery-1.9.1.min.js"
    },

    modules: [
        {
            name: "interactiveHarp",
            exclude: ["jquery"]
        }
    ]
})