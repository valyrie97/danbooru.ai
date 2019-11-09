const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const chokidar = require('chokidar');
// const livereload = require('livereload').createServer();
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const {copy,
	queueCompile,
	compile} = require('./compiler.js')
const glob = require('glob');

if(!fs.existsSync('./credentials.js')) fs.writeFileSync('./credentials.js', 'module.exports = {};')

glob('./src/**/*.js', (err, files) => {
	files.map(filepath => {
		console.log(`${filepath}`);
		queueCompile(filepath)
	})
})
glob('./static/**/*.*', (err, files) => {
	files.map(filepath => {
		console.log(`${filepath}`);
		copy(filepath)
	})
})
// allow non dot files to be coppied in netlify
glob('./static/**/*', (err, files) => {
	files.map(filepath => {
		console.log(`${filepath}`);
		copy(filepath)
	})
})

// livereload.watch(__dirname + "/dist");

// Something to use when events are received.
// const log = console.log.bind(console);
// // Add event listeners.
// watcher
//   .on('add', path => log(`File ${path} has been added`))
//   .on('change', path => log(`File ${path} has been changed`))
//   .on('unlink', path => log(`File ${path} has been removed`));

// // More possible events.
// watcher
//   .on('addDir', path => log(`Directory ${path} has been added`))
//   .on('unlinkDir', path => log(`Directory ${path} has been removed`))
//   .on('error', error => log(`Watcher error: ${error}`))
//   .on('ready', () => log('Initial scan complete. Ready for changes'))
//   .on('raw', (event, path, details) => { // internal
//     log('Raw event info:', event, path, details);
//   });

// // 'add', 'addDir' and 'change' events also receive stat() results as second
// // argument when available: https://nodejs.org/api/fs.html#fs_class_fs_stats
// watcher.on('change', (path, stats) => {
//   if (stats) console.log(`File ${path} changed size to ${stats.size}`);
// });

// Watch new files.
// watcher.add('new-file');
// watcher.add(['new-file-2', 'new-file-3', '**/other-file*']);

// // Get list of actual paths being watched on the filesystem
// var watchedPaths = watcher.getWatched();

// // Un-watch some files.
// watcher.unwatch('new-file*');

// // Stop watching.
// // The method is async!
// watcher.close().then(() => console.log('closed'));

// // Full list of options. See below for descriptions.
// // Do not use this example!
// chokidar.watch('file', {
//   persistent: true,

//   ignored: '*.txt',
//   ignoreInitial: false,
//   followSymlinks: true,
//   cwd: '.',
//   disableGlobbing: false,

//   usePolling: false,
//   interval: 100,
//   binaryInterval: 300,
//   alwaysStat: false,
//   depth: 99,
//   awaitWriteFinish: {
//     stabilityThreshold: 2000,
//     pollInterval: 100
//   },

//   ignorePermissionErrors: false,
//   atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
// });