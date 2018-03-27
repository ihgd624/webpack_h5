const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: false,
      hash: process.env.NODE_ENV === 'production',
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './public/contact.html',
      filename: 'contact.html',
      minify: false,
      hash: process.env.NODE_ENV === 'production',
      chunks: ['contact']
    }),
  ],
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