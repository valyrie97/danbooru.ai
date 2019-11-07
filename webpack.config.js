const livereload = require('webpack-livereload-plugin');

module.exports = {
	entry: {
		'components/gallery': './src/components/gallery.js',
		'pages/index': './src/pages/index.js',
	},
	output: {
		filename: '[name].js'
	},
	optimization: {
		minimize: false
	},
	plugins: [
		new livereload()
	]
}