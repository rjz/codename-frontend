var path = require('path');
var project = require('./package');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [ './src/main.js' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
    ]
  },
  resolve: {
    extensions: ['', '.css', '.js'],
    moduleDirectories: ['node_modules', 'src']
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};

