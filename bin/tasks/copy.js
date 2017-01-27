'use strict';

const copy = require( 'copy' );
const chalk = require( 'chalk' );
const config = require( '../../config' );

config.copy.forEach(task => {
    copy( task[1], task[2], (err, file) => {
        if ( err ) {
            console.log( chalk.white.bold.bgRed( `Copy: ${task[0]} Failed` ) );
            console.log( chalk.red( err ) );
        } else {
            console.log( chalk.white.bgGreen.bold( `Copy: ${task[0]} moved!` ) );
        }
    } );
});
