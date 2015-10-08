var webpack = require('webpack');
var objectAssign = require('object-assign');

var defaultConfig = require('./webpack.config.js');

var prodPlugins = defaultConfig.plugins.concat([
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = objectAssign({}, defaultConfig, {
  plugins: prodPlugins
});

