'use strict';

const path = require( 'path' );
const glob = require( 'glob' );
const env = process.env;

module.exports = {

	paths: {
		root: './',
		src: 'src',
		build: './build',
		sass: './src/sass',
		css: './build/css',
		js: './src/js',
		images: './src/images',
		icons: './src/icons',
		fonts: './src/fonts',
		sprites: './src/sprites',
		templates: './src/templates',
		helpers: './src/templates/helpers/**/*.js'
	},

	assemble: {
		data: './src/templates/data/**/*.json',
		partials: './src/templates/partials/**/*.hbs',
		layouts: './src/templates/layouts/**/*.hbs',
		pages: './src/templates/pages/**/*.hbs',
		dest: './build'
	},

	bs: {
		serveDir: './build',
		reload: [ 'build/*.html', 'build/js/*.js', 'build/css/*.css' ]
	},

	copy: [
		[ 'Favicons', './src/favicons/**/*', './build' ],
		[ 'Fonts', './src/fonts/**/*', './build/fonts' ]
	],

	iconFont: {
		icons: './src/icons/*.svg',
		dest: './build/fonts/',
		css: true,
		cssDest: './src/sass/generated/_icons.scss',
		cssTemplate: './bin/templates/css.hbs',
		cssFontsUrl: '../fonts/',
		htmlDest: './build/fonts.html',
		htmlTemplate: './bin/templates/html.hbs',
		classPrefix: 'icon-',
		baseClass: 'icon',
		types: [ 'svg', 'ttf', 'woff' ]
	},

	images: {
		src: './src/images/**/*',
		dest: './build/images'
	},

	postCSS: {
		src: './build/css/*.css',
		dest: './build/css/',
		autoprefixer: {
			browsers: [ 'last 2 versions', 'ie 9-11' ]
		},
		mqpacker: {
			sort: true
		}
	},

	sass: {
		src: './src/sass/*.scss',
		dest: './build/css/',
		includePaths: ''
	},

	sassdoc: {
		src: './src/sass',
		dest: './docs/sass'
	},

	serve: {
		port: 9000,
		cleanUrls: true,
		debug: false,
		gzip: true
	},

	tasks: {
		sequenced: [
			'clean'
		],
		concurrent: [
			// 'images',
			'iconfont',
			'copy',
			'sprites',
			'sass',
			'postcss',
			'webpack',
			'assemble'
		]
	},

	sprites: {
		src: './src/sprites',
		dest: './build/images/sprites',
		style: './src/sass/generated/_sprites.scss',
		processor: 'sass',
		styleType: 'scss',
		dimension: [ {
			ratio: 1,
			dpi: 72
		}, {
			ratio: 2,
			dpi: 192
		} ]
	},

	webpack: {
		dev: {
			devtool: 'source-map',
			entry: {
				global: './src/js/global.js',
				components: glob.sync( './src/js/components/*.js' )
			},
			output: {
				path: './build/js/',
				filename: '[name].js',
				sourceMapFilename: '[file].map'
			},
			module: {
				loaders: [ {
					test: /\.js$/,
					loader: 'babel-loader',
					query: {
						compact: false,
						presets: [ 'es2015' ],
						plugins: [ 'add-module-exports', 'transform-object-assign' ]
					},
					exclude: path.resolve( __dirname, 'node_modules' )
				} ]
			}

		},
		prod: {
			entry: {
				global: './src/js/global.js',
				components: glob.sync( './src/js/components/*.js' )
			},
			output: {
				path: './build/js/',
				filename: '[name].js',
			},
			module: {
				loaders: [ {
					test: /\.js$/,
					loader: 'babel-loader',
					query: {
						compact: true,
						presets: [ 'es2015' ],
						plugins: [ 'add-module-exports', 'transform-object-assign' ]
					},
					exclude: path.resolve( __dirname, 'node_modules' )
				} ]
			}

		}
	},

	watch: {
		sass: {
			pattern: 'src/sass/**/*.{sass,scss}'
		},
		webpack: {
			pattern: 'src/js/**/*.js'
		},
		images: {
			pattern: 'src/images/**/*.{jpg,jpeg,png,svg,gif}'
		},
		iconfont: {
			pattern: 'src/icons/**/*.svg'
		},
		fonts: {
			pattern: 'src/fonts/**/*.{svg,eot,ttf,woff,woff2}'
		},
		assemble: {
			pattern: 'src/templates/**/*.{hbs,json,js}'
		}
	}

};
