'use strict';

const imagemin = require( '../lib/imagemin' );
const map = require( 'map-stream' );
const vfs = require( 'vinyl-fs' );
const config = require( '../../config' );

vfs.src( [ config.images.src ] )
    .pipe( imagemin() )
    .pipe( vfs.dest( config.images.dest ) );
