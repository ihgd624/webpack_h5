const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const bootstrapEntryPoints = require('./webpack.bootstrap.config')

module.exports = merge(common, {
  entry: {
    "app.bundle": './js/index.js',
    "contact": './js/contact.js',
   // "bootstrap": bootstrapEntryPoints.dev
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 9000,
    open: true,
  }
});