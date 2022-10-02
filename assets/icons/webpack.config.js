const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		'default-icons': './src/default-icons/index.js',
		'fa-brands': './src/fa-brands/index.js',
		'fa-regular': './src/fa-regular/index.js',
		'fa-solid': './src/fa-solid/index.js',
		'material-filled': './src/material-filled/index.js',
		'material-outlined': './src/material-outlined/index.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack'],
			},
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	output: {
		filename: '[name].js',
		path: __dirname,
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
			}),
		],
	},
};
