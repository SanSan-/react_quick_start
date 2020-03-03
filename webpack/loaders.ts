/* eslint-disable @typescript-eslint/no-var-requires,
@typescript-eslint/explicit-function-return-type */
const settings = require('./settings');

const getCacheLoader = (cacheDirectory) => ({
  loader: 'cache-loader',
  options: {
    cacheDirectory
  }
});

const getThreadLoader = (name) => ({
  loader: 'thread-loader',
  options: {
    workerParallelJobs: settings.threadLoader.workerParallelJobs,
    poolRespawn: settings.threadLoader.poolRespawn,
    name
  }
});

module.exports = { getCacheLoader, getThreadLoader };
