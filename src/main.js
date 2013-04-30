require.config({
    baseUrl: '',
  
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