const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  //entry:  __dirname + "/js/index.js",//已多次提及的唯一入口文件
  // output: {
  //   path: __dirname + "/dist",//打包后的文件存放的地方
  //   filename: "bundle.js"//打包后输出文件的文件名
  // },
  entry:{
     "bundle": './js/index.js',
    // 这行是新增的。
    "contact": './js/contact.js'
  },
  devtool: 'source-map',//可定位源码的错误
  devServer: {
    port: 9001,
    open: true,
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({
    "title":'afu.......',
     template: './public/index.html',
    filename: 'test.html',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    excludeChunks: ['contact']  //excludeChunks 指的是不包含  即不包含index
  }),
  new HtmlWebpackPlugin({
    "title":'contact...afu....',
     template: './public/contact.html',
    filename: 'contact.html',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    chunks: ['contact']   //chunks 代表的是包含  代表只包含contact
  })],
  module: {
    rules: [
      {
        test: /\.css$/,//样式打包
        use: [ 'style-loader?sourceMap', 'css-loader?sourceMap' ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,//图片打包
        use: [
                {
                loader: 'file-loader',//图片打包
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/'
                  }
                }, 
                {
                  loader: 'image-webpack-loader',//图片压缩
                  options: {
                   bypassOnDebug: true,
                  }
                }
        ]
      },
      {
          test: /\.html$/,///src html资源加载   html-loader  svg 及所有图片
          use: [ {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }],
      }
    ]
  }
};