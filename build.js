({
    optimize: "none",
    baseUrl: 'src',
    name: 'almond',
    shim: {
        'interactiveHarp': {
            deps: [ 'musicHelper', 'audioHelper']
        }
    },
    include: ['interactiveHarp'],

    insertRequire: ['interactiveHarp'],
    out: 'build/interactiveHarp.js',
    wrap: true
})