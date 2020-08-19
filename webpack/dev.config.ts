import { Configuration } from 'webpack';

const webpack = require('webpack');
const { merge } = require('webpack-merge');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./base.config');
const settings: { resourcePrefix: string, htmlPlugin: Record<string, unknown> } = require('./settings');

const devConfig = (): Configuration => merge([
  {
    mode: 'development',
    output: {
      filename: `./js/[name].[chunkhash]${settings.resourcePrefix}.js`
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(true),
        __TEST__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        SERVER_MODULE_NAME: JSON.stringify('new-begin'),
        SERVER_PATH: JSON.stringify('../api')
      }),
      new MiniCssExtractPlugin({
        filename: `./css/[name].[contenthash]${settings.resourcePrefix}.css`,
        chunkFilename: `./css/[id]${settings.resourcePrefix}.css`,
        allChunks: true
      })
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
        '/api': {
          target: 'http://localhost:3003',
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
