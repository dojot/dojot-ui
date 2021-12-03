const { merge } = require("webpack-merge");
const dev = require("./webpack.dev.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(dev, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
              sourceMap: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // removes license.txt
        terserOptions: {
          format: {
            comments: false, // removes also comments inside the bundle
          },
        },
      }),
    ],
  },
});
