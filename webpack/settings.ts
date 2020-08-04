const path = require('path');

const resourcePrefix = '';
const rootDir = path.resolve(__dirname, '..');
const nodeModulesDir = path.resolve(__dirname, '..', 'node_modules');
const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');
const aliases = {
  '~app': path.resolve(rootDir, 'app'),
  '~src': path.resolve(rootDir, 'app', 'src'),
  '~actions': path.resolve(rootDir, 'app', 'src', 'actions'),
  '~components': path.resolve(rootDir, 'app', 'src', 'components'),
  '~forms': path.resolve(rootDir, 'app', 'src', 'components', 'forms'),
  '~hooks': path.resolve(rootDir, 'app', 'src', 'hooks'),
  '~model': path.resolve(rootDir, 'app', 'src', 'model'),
  '~const': path.resolve(rootDir, 'app', 'src', 'model', 'constants'),
  '~dictionaries': path.resolve(rootDir, 'app', 'src', 'model', 'dictionaries'),
  '~enums': path.resolve(rootDir, 'app', 'src', 'model', 'enums'),
  '~exceptions': path.resolve(rootDir, 'app', 'src', 'model', 'exceptions'),
  '~types': path.resolve(rootDir, 'app', 'src', 'model', 'types'),
  '~reducers': path.resolve(rootDir, 'app', 'src', 'reducers'),
  '~utils': path.resolve(rootDir, 'app', 'src', 'utils'),
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

module.exports = { resourcePrefix, rootDir, cacheDir, nodeModulesDir, aliases, threadLoader, htmlPlugin };
