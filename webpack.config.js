// Data
const data = require("./src/data/events.json");

// Dependencies
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATH = {
  source: path.join(__dirname, "src"),
  production: path.join(__dirname, "dist")
};

module.exports = {
  entry: "./src/app.js",
  output: {
    path: PATH.production,
    filename: "[name].js"
  },
  devServer: {
    open: true,
    compress: true,
    hot: true,
    inline: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|svg|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader",
            query: {
              limit: 0,
              attrs: "img:src img:srcset"
            }
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
              data: data
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATH.source + "/templates/index.pug",
    })
  ]
};