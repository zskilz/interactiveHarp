require.config({
    //By default load any module IDs from js/lib
    baseUrl: '',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        "jquery": [ // 'https://code.jquery.com/jquery-1.9.1.min',
        'jquery-1.9.1.min']
    },

    shim: {
        'interactiveHarp': {
            deps: ['jquery', 'musicHelper', 'audioHelper']
        }
    }
});

// Start the main app logic.
require(['jquery', 'interactiveHarp'],

function($) {
    //jQuery loaded and can be used here now.
    $(function() {
        $('#testDiv').interactiveHarp();
    });
});