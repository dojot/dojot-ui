const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const { DefinePlugin } = require("webpack");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const { dependencies } = require("./package.json");
const remoteList = require("./config/remotes.json");
const config = require("./config/default.json");

const BUNDLE_NAME = "cornerstone";

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "inline-source-map",

  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(__dirname, "dist"), //this tells webpack where to output the files
    filename: "[name].bundle.js", // The filename of the output artifacts, using a  dynamic names if you are making multiple chunks. Webpack will decide the name dynamically.
    publicPath: config.publicPath, // tells Webpack about how and from where to serve the external assets like images or other files.
    clean: true, //this tells webpack to clean the output path first, so if the files exist they'll be cleaned up first.
    assetModuleFilename: "assets/[name][ext]", //make assets have friendly names
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    watchFiles: ["../src/**/*.*"], //turns on hot module reloading capability
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    // rules tell webpack what to do on specific tests, so we need
    // to tell webpack what to do when it's processing a js, css, jpg, and so on.
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
        test: /\.(woff(2)?|ttf|eot|svg|jpg|jpeg|png|gif|pdf)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset",
        // This is other webpack 5 feature. It can automatically pull any
        // files we reference and spit them out as assets in the output folder.
        // In webpack 4 you had to use file loader, url loader, and so on. For more info,
        // check this reference: https://dev.to/smelukov/webpack-5-asset-modules-2o3h
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new DashboardPlugin({ minified: false, gzip: false }),
    new DefinePlugin({
      __CONFIG__: JSON.stringify(config),
      GUI_VERSION: JSON.stringify(process.env.GUI_VERSION),
    }),
    new CaseSensitivePathsPlugin(),
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

/*

* Webpack plugins we'll use in the project

    css-loader:	          used to process css to be output
    style-loader:	        used to inject css to the page
    module-federation-plugin: used to export and require external componennts in
                          microfrontend architecture.
    terser-webpack-plugin: used to minify assets
    html-webpack-plugin:	used to tell webpack to generate an index.html for our
                          project from a template html file
    webpack-dev-server:	  used to run our react app locally with hot module reloading
    mini-css-extract-plugin: extracts CSS into separate files, builds on top of a new
                          webpack v5 feature
    case-sensitive-paths-plugin: Using this plugin helps alleviate cases where
                          developers working on OSX, which does not follow strict path
                          case sensitivity

*/
