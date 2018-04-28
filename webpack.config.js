const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
	main: './src/index.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase:true,
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
  },
  module: {
    // Add loader
    rules: [
    	{
			  test: /\.(otf|ttf|eot|woff|woff2|jpg|png|svg)$/,
			    loader: 'url-loader',
			    options: {
			      name: 'public/fonts/[name].[ext]',
			      limit: 25000
			    },
			},
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader'
	      }
	    },
	    {
	    	test:/\.scss$/,
	  		use: [{
	                loader: "style-loader" // creates style nodes from JS strings
	            }, {
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "sass-loader" // compiles Sass to CSS
	            }]
	    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
  	jquery: 'jQuery'
	}
};