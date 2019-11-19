/* eslint-disable no-process-env, no-undef, @typescript-eslint/no-var-requires,
@typescript-eslint/explicit-function-return-type */
const webpack = require('webpack');
const merge = require('webpack-merge');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./base.config');
const settings = require('./settings');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true, lightweightTags: true });
const versionComment = '/* Version ' + gitRevisionPlugin.version() + '; branch: ' +
  gitRevisionPlugin.branch() + '; commit hash: ' + gitRevisionPlugin.commithash() + ' */';

const prodConfig = () => merge([
  {
    mode: 'production',
    output: {
      filename: './js/[name].bundle' + settings.resourcePrefix + '.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(false),
        __TEST__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        SERVER_MODULE_NAME: JSON.stringify('new-begining'),
        HTTP_BRIDGE_SERVER_PATH: JSON.stringify('../httpbridge-server')
      }),
      new MiniCssExtractPlugin({
        filename: './css/[name].bundle' + settings.resourcePrefix + '.css',
        allChunks: true
      }),
      new HtmlWebpackPlugin(settings.htmlPlugin),
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
            ecma: 6
          }
        }),
        new OptimizeCssAssetsPlugin({})
      ]
    }
  }
]);

module.exports = () => merge(baseConfig(), prodConfig());
