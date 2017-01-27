'use strict';
const path = require('path');
const through = require('through2-concurrent');
const prettyBytes = require('pretty-bytes');
const chalk = require('chalk');
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const plur = require('plur');

module.exports = (plugins, opts) => {
	if (typeof plugins === 'object' && !Array.isArray(plugins)) {
		opts = plugins;
		plugins = null;
	}

	opts = Object.assign({
		verbose: process.argv.indexOf('--verbose') !== -1
	}, opts);

	const validExts = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

	let totalBytes = 0;
	let totalSavedBytes = 0;
	let totalFiles = 0;

	return through.obj((file, enc, cb) => {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(console.log('imagemin', 'Streaming not supported'));
			return;
		}

		if (validExts.indexOf(path.extname(file.path).toLowerCase()) === -1) {
			if (opts.verbose) {
				console.log(`imagemin: Skipping unsupported image ${chalk.blue(file.relative)}`);
			}

			cb(null, file);
			return;
		}

		const use = plugins || [
			imageminGifsicle(),
			imageminJpegtran(),
			imageminOptipng(),
			imageminSvgo()
		];

		imagemin.buffer(file.contents, {use})
			.then(data => {
				const originalSize = file.contents.length;
				const optimizedSize = data.length;
				const saved = originalSize - optimizedSize;
				const percent = originalSize > 0 ? (saved / originalSize) * 100 : 0;
				const savedMsg = `saved ${prettyBytes(saved)} - ${percent.toFixed(1).replace(/\.0$/, '')}%`;
				const msg = saved > 0 ? savedMsg : 'already optimized';

				totalBytes += originalSize;
				totalSavedBytes += saved;
				totalFiles++;

				if (opts.verbose) {
					console.log('imagemin:', chalk.green('✔ ') + file.relative + chalk.gray(` (${msg})`));
				}

				file.contents = data;
				cb(null, file);
			})
			.catch(err => {
				setImmediate(cb, console.log('imagemin', err, {fileName: file.path}));
			});
	}, cb => {
		const percent = totalBytes > 0 ? (totalSavedBytes / totalBytes) * 100 : 0;
		let msg = `Minified ${totalFiles} ${plur('image', totalFiles)}`;

		if (totalFiles > 0) {
			msg += chalk.gray(` (saved ${prettyBytes(totalSavedBytes)} - ${percent.toFixed(1).replace(/\.0$/, '')}%)`);
		}
		console.log( chalk.white.bgGreen.bold(msg));
		cb();
	});
};

module.exports.gifsicle = imageminGifsicle;
module.exports.jpegtran = imageminJpegtran;
module.exports.optipng = imageminOptipng;
module.exports.svgo = imageminSvgo;
