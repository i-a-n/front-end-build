'use strict';

const fs = require( 'fs-extra' );
const glob = require( 'glob-fs' )( {gitignore: true} );
const path = require( 'path' );
const chalk = require( 'chalk' );
const autoprefixer = require( 'autoprefixer' );
const mqpacker = require( 'css-mqpacker' );
const postcss = require( 'postcss' );
const config = require( '../../config' );

glob.readdirStream( config.postCSS.src , {} )
    .on( 'data', function ( file ) {
        const css = fs.readFileSync( path.join( config.paths.css, file.basename ), 'utf-8' );

        postcss( [ autoprefixer( config.postCSS.autoprefixer ), mqpacker( config.postCSS.mqpacker ) ] ).process( css ).then( result => {
            result.warnings().forEach( warn => {
                console.log( chalk.white.bgRed.bold( 'PostCSS Fail' ) );
                console.log( chalk.white.bold( warn.toString() ) );
            } );
            fs.outputFile( path.join( config.paths.css, file.basename ), result.css, err => {
                if ( err ) {
                    console.log( chalk.white.bgRed.bold( 'Error writing css file!' ) );
                } else {
                    console.log( chalk.white.bgGreen.bold( 'Sass PostCSS Comnplete ' + file.basename ) );
                }
            } );
        } );


    } );
