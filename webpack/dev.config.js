/* eslint-disable no-process-env, no-undef */
const webpack = require('webpack');
const merge = require('webpack-merge');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base.config');
const settings = require('./settings');

const devConfig = () => merge([
  {
    mode: 'development',
    output: {
      filename: './js/[name].[chunkhash]' + settings.resourcePrefix + '.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(true),
        __TEST__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        SERVER_MODULE_NAME: JSON.stringify('new-begining'),
        HTTP_BRIDGE_SERVER_PATH: JSON.stringify('../httpbridge-server')
      }),
      new MiniCssExtractPlugin({
        filename: './css/[name].[contenthash]' + settings.resourcePrefix + '.css',
        chunkFilename: './css/[id]' + settings.resourcePrefix + '.css',
        allChunks: true
      }),
      new HtmlWebpackPlugin(settings.htmlPlugin)
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    devtool: 'inline-source-map',
    devServer: {
      clientLogLevel: 'info',
      compress: false,
      contentBase: 'dist',
      historyApiFallback: {
        index: 'index.html'
      },
      open: false,
      port: 9090,
      proxy: {
        '/httpbridge-server': {
          target: 'http://localhost:8000',
          secure: false
        }
      },
      stats: {
        colors: true
      },
      watchContentBase: true
    }
  }
]);

module.exports = () => merge(baseConfig(), devConfig());
