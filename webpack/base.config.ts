import { Configuration } from 'webpack';

const path = require('path');
const { merge } = require('webpack-merge');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const settings = require('./settings');
const loaders = require('./loaders');

module.exports = (): Configuration => merge([
  {
    context: settings.rootDir,
    entry: {
      app: path.resolve(settings.rootDir, 'app', 'src', 'index.tsx')
    },
    output: {
      publicPath: '',
      path: path.resolve(settings.rootDir, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'css')),
            loaders.getThreadLoader('css'),
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'css')),
            loaders.getThreadLoader('css'),
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          test: /\.(png|gif|jpe?g)$/,
          use: ['file-loader?publicPath=./&name=img/[hash].[ext]']
        },
        {
          test: /\.(svg|woff|woff2|eot|ttf)$/,
          use: [`file-loader?publicPath=../&name=fonts/[hash].[ext]?${Date.now()}`]
        },
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          use: ['source-map-loader']
        },
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          use: ['eslint-loader'],
          exclude: /(node_modules)/
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'js')),
            loaders.getThreadLoader('js'),
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: path.resolve(settings.cacheDir, 'babel')
              }
            }
          ]
        }
      ]
    },
    externals: {},
    target: 'web',
    resolve: {
      alias: settings.aliases,
      extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true
          }
        },
        chunks: 'all'
      }
    },
    plugins: [
      new AntdDayjsWebpackPlugin()
    ]
  }
]);
