'use strict';

const config = require( '../../config' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const extname = require( 'gulp-extname' );
const assemble = require( 'assemble' );
const helpers = require( 'handlebars-helpers' )();
const app = assemble();


app.create( 'pages' );

app.task( 'load', cb => {
    app.helpers( [helpers, config.paths.helpers ] );
    app.data( config.assemble.data );
    app.partials( config.assemble.partials );
    app.layouts( config.assemble.layouts );
    app.pages( config.assemble.pages );
    cb();
} );

app.task( 'default', [ 'load' ], () => app.toStream( 'pages' )
    .pipe( app.renderFile() )
    .pipe( extname() )
    .pipe( app.dest( config.assemble.dest ) ) );

app.build( [ 'default' ], err => {
    if ( err ) throw err;
    console.log( chalk.white.bgGreen.bold( 'Assembled Templates' ) );
} );
