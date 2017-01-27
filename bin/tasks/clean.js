'use strict';

const path = require( 'path' );
const chalk = require( 'chalk' );
const rimraf = require( 'rimraf' );
const config = require( '../../config' );

rimraf( path.join(config.paths.build, '/**/*'), {
    rmdir: false
}, function ( err ) {
    if ( err ) {
        console.log( chalk.white.bold.bgRed( 'Clean Failed' ) );
        console.log( chalk.red( err ) );
    } else {
        console.log( chalk.white.bgGreen.bold( 'Build Directory Cleaned' ) );
    }
} );
