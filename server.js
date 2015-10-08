require('babel-core/polyfill');

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var port = 3203;
var host = 'localhost';

webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://${host}:${port}`);

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
  hot: true,
  host: host,
  port: port,
  stats: { colors: true },
  historyApiFallback: true
});

server.listen(port, host);

