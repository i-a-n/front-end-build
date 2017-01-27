'use strict';

const config = require( '../../config' );
const sprite = require( 'sprity' );

sprite.create( {
    src: config.sprites.src,
    out: config.sprites.dest,
    style: config.sprites.style,
    processor: config.sprites.processor,
    'style-type': config.sprites.styleType,
    'dimension': config.sprites.dimension

}, function () {
    console.log( 'done' );
} );
