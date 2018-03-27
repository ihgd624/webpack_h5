const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除hash文件
let pathsToClean = ['dist',];

//npm 命令
//安装                    npm install -g webpack  
//测试版本号              webpack -v
//
//进入目录后，用npm init初始化项目
//集成webpack当前目录     npm install --save-dev webpack
//用css-loader和 style-loader处理CSS[可打包CSS文件]     npm install --save-dev css-loader style-loader 在config.js中的module配置rules
//清除hash生成的文件           npm i clean-webpack-plugin --save-dev   在配置文件plugins中加入 new CleanWebpackPlugin(pathsToClean),
//加载图片等HTML资源文件   npm install --save-dev file-loader
//图片压缩 npm install image-webpack-loader --save-dev  

//webpack.json与webpack.config.js配置
//1：配置webpack.json
// webpack.json===============>"scripts": {"dev": "webpack-dev-server --config webpack.dev.js","prod": "webpack -p --config webpack.prod.js"}
// 然后可以用npm run dev  或  npm run prod
// 
//2：配置webpack.config.js文件
//如下----
//
//更多详见==》https://www.zhihu.com/question/39290543


module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',//可定位源码的错误
  plugins: [
    new HtmlWebpackPlugin({
      template: './mb/index.html',
      filename: 'index.html',
      minify: false,
      hash: process.env.NODE_ENV === 'production',
      excludeChunks: ['contact']
    }),
    new CleanWebpackPlugin(pathsToClean),//清除hash文件
    new webpack.ProvidePlugin({
        '$': 'zepto',
        'zepto': 'zepto',
        'window.zepto': 'zepto',
        'window.$': 'zepto',
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