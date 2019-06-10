/* eslint-disable no-process-env, no-undef */
const path = require('path');

const resourcePrefix = '';
const rootDir = path.resolve(__dirname, '..');
const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');
const aliases = {
  '~': path.resolve(rootDir, 'src'),
  '~app': path.resolve(rootDir, 'src', 'app'),
  '~actions': path.resolve(rootDir, 'src', 'app', 'actions'),
  '~components': path.resolve(rootDir, 'src', 'app', 'components'),
  '~forms': path.resolve(rootDir, 'src', 'app', 'forms'),
  '~reducers': path.resolve(rootDir, 'src', 'app', 'reducers'),
  '~utils': path.resolve(rootDir, 'src', 'app', 'utils'),
  '~const': path.resolve(rootDir, 'src', 'const'),
  '~mock': path.resolve(rootDir, 'mock-server', 'app', 'routes', 'mock'),
  '~test': path.resolve(rootDir, 'test')
};
const threadLoader = { workerParallelJobs: 50, poolRespawn: false };
const htmlPlugin = {
  inject: false,
  hash: true,
  template: './app/src/index.html',
  filename: 'index.html',
  favicon: './app/resources/favicon.ico'
};

module.exports = { resourcePrefix, rootDir, cacheDir, aliases, threadLoader, htmlPlugin };
