const path = require('path');
const webpack = require('webpack');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = require('./loaders');
const settings: { resourcePrefix: string, htmlPlugin: Record<string, unknown> } = require('./settings');

const gitRevisionPlugin: { version: () => string, branch: () => string, commithash: () => string } =
  new GitRevisionPlugin({ branch: true, lightweightTags: true });
/* eslint-disable-next-line max-len */
const versionComment = `/* Version ${gitRevisionPlugin.version()}; branch: ${gitRevisionPlugin.branch()}; commit hash: ${gitRevisionPlugin.commithash()} */`;

module.exports = {
  mode: 'production',
  context: settings.rootDir,
  entry: {
    app: path.resolve(settings.rootDir, 'app', 'src', 'index.tsx')
  },
  output: {
    filename: `./js/[name].bundle${settings.resourcePrefix}.js`
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
        type: 'asset/resource',
        generator: {
          filename: 'img/[contenthash].[ext]'
        }
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: `fonts/[contenthash].[ext]?${Date.now()}`
        }
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
  plugins: [
    new AntdDayjsWebpackPlugin(),
    new HtmlWebpackPlugin(settings.htmlPlugin),
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(false),
      __TEST__: JSON.stringify(false),
      SERVER_MODULE_NAME: JSON.stringify('new-begining'),
      SERVER_PATH: JSON.stringify('../api')
    }),
    new MiniCssExtractPlugin({
      filename: `./css/[name].bundle${settings.resourcePrefix}.css`,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new WrapperPlugin({
      header: versionComment + '\r\n'
    })
  ],
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        parallel: true,
        terserOptions: {
          ecma: 5
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        }
      },
      chunks: 'all'
    }
  }
};
