'use strict';

const fs = require( 'fs-extra' );
const path = require( 'path' );
const glob = require( 'glob-fs' )( { gitignore: true } );
const chalk = require( 'chalk' );
const log4js = require('log4js');
const logger = log4js.getLogger();
const sassImport = require( 'node-sass-import' );
const sass = require( 'node-sass' );
const config = require( '../../config' );
const buildenv = ( function () {
    if ( process.argv[ 2 ] === 'production' ) {
        return true;
    }
} )();

glob.readdirStream( config.sass.src, {} )
    .on( 'data', function ( file ) {
        sass.render( {
            file: file.relative,
            outFile: file.name + '.css',
            includePaths: config.sass.includePaths,
            outputStyle: 'compressed',
            sourceMap: buildenv ? true : false
        }, ( error, result ) => {
            if ( error ) {
                logger.error( chalk.white.bgRed.bold( 'Sass Compliation' ) );
                logger.error( chalk.white.bold( error.formatted ) );
            } else {
                fs.outputFile( config.sass.dest + file.name + '.css', result.css, err => {
                    if ( err ) {
                        logger.info( chalk.white.bgRed.bold( 'Error writing css file!' ) );
                    } else {
                        logger.info( chalk.white.bgGreen.bold( 'Sass Compiled ' + file.basename ) );
                    }
                } );
            }
        } );

    } );
