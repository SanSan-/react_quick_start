import { Configuration } from 'webpack';

const webpack = require('webpack');
const { merge } = require('webpack-merge');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./base.config');
const settings: { resourcePrefix: string, htmlPlugin: Record<string, unknown> } = require('./settings');

const gitRevisionPlugin: { version: () => string, branch: () => string, commithash: () => string } =
  new GitRevisionPlugin({ branch: true, lightweightTags: true });
/* eslint-disable-next-line max-len */
const versionComment = `/* Version ${gitRevisionPlugin.version()}; branch: ${gitRevisionPlugin.branch()}; commit hash: ${gitRevisionPlugin.commithash()} */`;

const prodConfig = (): Configuration => merge([
  {
    mode: 'production',
    output: {
      filename: `./js/[name].bundle${settings.resourcePrefix}.js`
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(false),
        __TEST__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
        new OptimizeCssAssetsPlugin({})
      ]
    }
  }
]);

module.exports = () => merge(baseConfig(), prodConfig());
