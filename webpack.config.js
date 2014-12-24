var path = require("path");

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var commonEntries = ["commonOne", "commonTwo"];
var standaloneEntryPoints = ["standaloneOne", "standaloneTwo"];

var config = {
  entry: {},
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader"
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin("common.js", commonEntries),
    new ExtractTextPlugin("[name].css")
  ],
  bail: true,
  cache: true
};

commonEntries.concat(standaloneEntryPoints).forEach(function(entry){
  config.entry[entry] = "./src/" + entry + ".coffee";
});

module.exports = config;
