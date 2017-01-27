const config = require( '../../config' );
const gaze = require( 'gaze' );
const chalk = require( 'chalk' );
const shell = require( 'shelljs' );
const log4js = require( 'log4js' );
log4js.configure( {
    appenders: [ {
        type: 'console',
        layout: {
            type: 'pattern',
            pattern: "%[%d{ABSOLUTE}]% WATCH %[%-5p%] %n%m"
        }
    } ]
} );
const logger = log4js.getLogger();

const watch = function ( filePattern, task ) {
    gaze( filePattern, function ( err, watcher ) {
        var watched = this.watched();
        this.on( 'all', function ( event, filepath ) {
            logger.info( filepath + ' was ' + event );
            shell.exec( 'node ./bin/tasks/' + task, {
                async: false,
                silent: true
            }, function ( code, stdout, stderr ) {
                shell.echo( '\033[1m=>  ' + task.toUpperCase() );
                shell.echo( '-------------------------\033[1m' );
                logger.info( stdout );
                logger.info('Watching: ' + task );
            } )
        } );
    } );
};

shell.echo( '\033[1m=>  ' + 'WATCHING' );
shell.echo( '-------------------------\033[1m' );
for ( var key of Object.keys( config.watch ) ) {
    shell.echo( key );
    watch( config.watch[ key ].pattern, key )
}
shell.echo( '-------------------------\033[1m' );
