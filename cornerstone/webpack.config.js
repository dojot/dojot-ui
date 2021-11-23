const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { DefinePlugin } = require("webpack");

const config = require("./config/default.json");
const dependencies = require("./package.json").dependencies;
const remoteList = require("./config/remotes.json");
const BUNDLE_NAME = 'cornerstone';

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
  },
   resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      // O nome desse módulo para a federação será "cornerstone"
      name: BUNDLE_NAME,
      library: { type: "var", name: BUNDLE_NAME },
      // O arquivo que precisa ser carregado pelas outras aplicações é o remoteEntry.js
      filename: "remoteEntry.js",
      remotes: remoteList,
       exposes: {
         // O componente (Pagina) está sendo exposto em cornerstone/App.
          "./App": "./src/App",
      },
      shared: {
              // Aqui estamos definindo as dependências do package.json que são compatilhadas
              // react-router-dom, react-dom e react são singletons
              "react-router-dom": {
                  requiredVersion: dependencies['react-router-dom'],
                  singleton: true,
              },
              "react-dom": {
                  requiredVersion: dependencies['react-dom'],
                  singleton: true,
              },
              react: {
                  requiredVersion: dependencies['react'],
                  singleton: true,
              },
          }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new DefinePlugin({
      __CONFIG__: JSON.stringify(config),
      GUI_VERSION: JSON.stringify(process.env.GUI_VERSION),
  }),
  ],
};
