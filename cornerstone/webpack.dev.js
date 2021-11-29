const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

const { dependencies } = require("./package.json");
const remoteList = require("./config/remotes.json");
const config = require("./config/default.json");

const BUNDLE_NAME = "cornerstone";

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: config.publicPath,
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new DefinePlugin({
      __CONFIG__: JSON.stringify(config),
      GUI_VERSION: JSON.stringify(process.env.GUI_VERSION),
    }),
    new ModuleFederationPlugin({
      // The Name used for module federation plugin will be "cornerstone"
      name: BUNDLE_NAME,
      // The initial file loaded by the other applications, in this case, will
      // be the remoteEntry.js
      filename: "remoteEntry.js",
      remotes: remoteList,
      exposes: {},
      shared: {
        // Here we are setting up the shared dependencies for all applications.
        // react-router-dom, react-dom and react will be singletons
        "react-router-dom": {
          requiredVersion: dependencies["react-router-dom"],
          singleton: true,
        },
        "react-dom": {
          requiredVersion: dependencies["react-dom"],
          singleton: true,
        },
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
  ],
};
