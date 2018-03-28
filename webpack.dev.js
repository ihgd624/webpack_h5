const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const bootstrapEntryPoints = require('./webpack.bootstrap.config')

module.exports = merge(common, {
  entry: {
    "app.bundle": './mb/main.js',
    //"contact": './js/contact.js',
   // "bootstrap": bootstrapEntryPoints.dev
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    //host:"127.0.0.2",
    inline: true,
    port: 9000,
    open: true,
  }
});
