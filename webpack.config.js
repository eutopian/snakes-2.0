var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'webpack-bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loder", "less-loader"]
      }
    ]
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    watchContentBase: true
  }
}
