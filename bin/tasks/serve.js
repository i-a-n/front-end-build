'use strict';

const fs = require( 'fs' );
const pkg = JSON.parse( fs.readFileSync( 'package.json', 'utf8' ) );
const superstatic = require( 'superstatic' ).server;
const chalk = require( 'chalk' );
const config = require( '../../config' );

const serverOptions = {
    config: {
        public: config.paths.build,
        cleanUrls: config.serve.cleanUrls
            // redirects: [],
            // rewrites: [ {
            //     source: '**',
            //     destination: '/index.html'
            // } ]
    },
    //errorPage: './build/error.html',
    port: process.env.PORT || config.serve.port,
    debug: config.serve.debug,
    gzip: config.serve.gzip
};

const app = superstatic( serverOptions );

const server = app.listen( err => {
    if ( err ) {
        console.log( chalk.white.bold.bgRed( pkg.name + ' failed to start on port ' + serverOptions.port ) );
        console.log( chalk.red( err ) );
    }
    console.log( chalk.white.bold.bgGreen( pkg.name + ' running on port ' + serverOptions.port ) );
} );
