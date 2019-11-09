const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const chokidar = require('chokidar');
// const livereload = require('livereload').createServer();
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
let queue = Promise.resolve();

module.exports = {
	copy,
	queueCompile,
	compile
};

async function copy(filepath) {
	const newpath = path.join('./dist', path.relative('./static', filepath));
	fse.ensureDirSync(path.parse(newpath).dir);
	console.log(filepath, '=>', newpath)
	fs.copyFile(filepath, newpath, _ => _);
}

async function queueCompile(filepath) {
	// await queue;
	queue = queue.then(async function() {
		console.time('webpack')
		await compile(filepath);
		console.timeEnd('webpack')
	});
}

function compile(filepath) {
	return new Promise ((res) => {
		const name = path.parse(filepath).name;
		const newpath = path.parse(path.relative('./src', filepath)).dir;
		console.log(newpath);
		webpack({
			mode: 'production',
			devtool: 'source-map',
			entry: {
				[name]: `./${filepath}`
			},
			watch: true,
			output: {
				filename: path.join(newpath, '[name].bundle.js')
			},
			plugins: [
				new FriendlyErrorsWebpackPlugin({
					clearConsole: false
				}),
				// new LiveReloadPlugin({}),
				// new CopyPlugin([
				//   { from: './static', to: './' },
				// ]),
			]
		}, (err, stats) => {
			res();
		});
	})
}
