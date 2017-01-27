'use strict';

const path = require( 'path' );
const chalk = require( 'chalk' );
const webpack = require( 'webpack' );
const glob = require( 'glob' );
const buildenv = ( process.argv[ 2 ] === 'production' ) ? 'prod': 'dev';
const config = require( '../../config' );

const compiler = webpack( config.webpack[ buildenv ] );

compiler.run( ( err, stats ) => {
    if ( err ) {
        console.log( 'webpack:build', err );
    }
    console.log( '[webpack:build:' + buildenv + ']', stats.toString( {
        chunks: true,
        colors: true
    } ) );
    console.log( chalk.white.bgGreen.bold( 'Webpack JS Compliation Complete!' ) );
} );
