'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const pkg = JSON.parse( fs.readFileSync( 'package.json', 'utf8' ) );
const webfontsGenerator = require( 'webfonts-generator' );
const glob = require( 'glob-fs' )( { gitignore: true } );
const config = require( '../../config' );
const files = glob.readdirSync( config.iconFont.icons );

webfontsGenerator( {
	fontName: pkg.name,
	files: files,
	dest: path.join( config.iconFont.dest, pkg.name ),
	css: true,
	cssDest: config.iconFont.cssDest,
	cssTemplate: config.iconFont.cssTemplate,
	cssFontsUrl: path.join( config.iconFont.cssFontsUrl, pkg.name ),
	html: true,
	htmlDest: config.iconFont.htmlDest,
	htmlTemplate: config.iconFont.htmlTemplate,
	templateOptions: {
		classPrefix: config.iconFont.classPrefix,
		baseClass: config.iconFont.baseClass
	},
	types: config.iconFont.types,
	writeFiles: true

}, error => {
	if ( error ) {
		console.log( chalk.white.bgRed.bold( 'Error creating iconfont!' ) );
		console.log( error );
	} else {
		console.log( chalk.white.bgGreen.bold( 'Iconfont Generated!' ) );
	}
} );
