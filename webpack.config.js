var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssExtractTextPlugin = new ExtractTextPlugin(1, "[name].css");
var poExtractTextPlugin = new ExtractTextPlugin(2, "[name].po");

var config = {
  entry: {
    "standalone": "./src/standalone.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: cssExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }, {
        test: /\.po$/,
        loader: poExtractTextPlugin.extract("raw-loader", "raw-loader")
      }
    ]
  },
  plugins: [
    cssExtractTextPlugin,
    poExtractTextPlugin
  ],
  bail: true,
  cache: true
};

module.exports = config;
