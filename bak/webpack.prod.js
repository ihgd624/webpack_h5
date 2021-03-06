const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const bootstrapEntryPoints = require('./webpack.bootstrap.config')
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    "app.bundle": './js/index.js',
    "contact": './js/index.js',
  //  "bootstrap": bootstrapEntryPoints.prod
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});