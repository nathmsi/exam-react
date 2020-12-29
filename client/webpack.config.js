const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = () => {

  return {
    devtool : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(jpe?g|gif|ico|png|svg|jpg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        favicon: './src/assets/weather.ico'
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      mainFields: ['module', 'jsnext:main', 'browser', 'main']
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              pure_funcs: ['console.log'],
            },
            mangle: {
              reserved: ['console.log']
            }
          }
        })
      ]
    }
  }
};
