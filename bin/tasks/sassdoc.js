const sassdoc = require( 'sassdoc' );
const chalk = require( 'chalk' );

sassdoc( config.sassdoc.src , {
        dest: config.sassdoc.dest,
        verbose: true
    } )
    .then( function () {
        console.log( 'Your documentation has been generated!' );
    }, function ( err ) {
        console.error( err );
    } );
