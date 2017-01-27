const config = require( '../../config' );
const shell = require( 'shelljs' );
const log4js = require( 'log4js' );
const args = process.argv[ 2 ];
log4js.configure( {
	appenders: [ {
		type: 'console',
		layout: {
			type: 'pattern',
			pattern: "%[%d{ABSOLUTE}]% BUILD %[%-5p%] %n%m"
		}
	} ]
} );
const logger = log4js.getLogger();

console.log('\n ____        _ _     _ \n' +
 '| __ ) _   _(_) | __| |\n'+
 '|  _ /\| | | | | |/ _` |\n'+
 '| |_) | |_| | | | (_| |\n'+
 '|____/ /\__,_|_|_|/\__,_|\n');

config.tasks.sequenced.forEach( function ( step ) {
	shell.exec( 'node ./bin/tasks/' + step + ' ' + args, {
		async: false,
		silent: true
	}, function ( code, stdout, stderr ) {
		shell.echo( '\033[1m=>  ' + step.toUpperCase() );
		shell.echo( '-------------------------\033[1m' );
		logger.info( stdout );
	} )
} );

config.tasks.concurrent.forEach( function ( step ) {
	shell.exec( 'node ./bin/tasks/' + step + ' ' + args, {
		async: true,
		silent: true
	}, function ( code, stdout, stderr ) {
		shell.echo( '\033[1m=>  ' + step.toUpperCase() );
		shell.echo( '-------------------------\033[1m' );
		logger.info( stdout );
	} )
} );
