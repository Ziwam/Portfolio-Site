const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
	main: './src/index.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase:true,
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
  },
  module: {
    // Add loader
    rules: [{
    	test:/\.scss$/,
  		use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};