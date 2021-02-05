const common = require('./webpack.config.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ReloadServerPlugin = require('reload-server-webpack-plugin')
const path = require('path')

module.exports = merge(common,{
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'index.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
