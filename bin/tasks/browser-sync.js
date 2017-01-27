'use strict';

const bs = require( 'browser-sync' ).create();
const config = require( '../../config' );

bs.init( {
    server: config.bs.serveDir
} );

config.bs.reload.forEach(path => {
    bs.watch(path).on('change', bs.reload);
});
