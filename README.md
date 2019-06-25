# [webpack 4, react-16, redux 4, react-router 5, babel 7, jest 24, enzyme 3, antd 3] Quick starter (without TypeScript (maybe temporary))

### Introduction

This is quick start bundle for quick start development without noisy initialization of project (it may take several days) 

### Bundle include:
* main
- bundler:: webpack 4
- view:: react 16.8
- routing:: react-router 5
- state storing:: redux 4, redux-thunk 2.3
- history routing:: history 4.9, connected-react-router 6.4 
- type checking:: prop-types 15
- transpalation:: babel 7
* test
- test manager:: jest 24.8
- test environments:: enzyme 3, sinon 7
- static checking:: eslint 5.16
* decoration
- components:: antd 3.19
- date:: moment 2.24
- style:: less 3.9, sass

### Install Webpack

package.json
```json
  "scripts": {
    "webpack:start": "webpack-dev-server --progress --colors --config ./webpack/dev.config.js",
    "webpack:build": "webpack --config ./webpack/prod.config.js",
    "webpack:watch": "npm run webpack:build -- --progress --colors --watch",
  },
  "devDependencies": {
    ...
    "cache-loader": "^2.0.1",
    "copy-webpack-plugin": "^5.0.3",
    "git-revision-webpack-plugin": "^3.0.3",
    "html-webpack-plugin": "3.2.0",
    "terser-webpack-plugin": "^1.3.0",
    "thread-loader": "^2.1.2",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.4.1",
    "webpack-merge": "^4.1.5",
    "wrapper-webpack-plugin": "^2.1.0"
    ...
  }
```

* Optimization: increase speed of build

webpack/settings.js
```js
const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');

const threadLoader = { workerParallelJobs: 50, poolRespawn: false };
```

webpack/loaders.js
```js
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
```

webpack/base.config.js
```js
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'js')),
            loaders.getThreadLoader('js')
          ]
        }
      ]
    }
```

* Optimization: split chunks on vendor (node_modules) and application-only

webpack/base.config.js
```js
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
    }
```

* Optimization: auto paste scripts into html and load favicon

webpack/settings.js
```js
const htmlPlugin = {
  inject: false,
  hash: true,
  template: './app/src/index.html',
  filename: 'index.html',
  favicon: './app/resources/favicon.ico'
};
```

webpack/prod.config.js or webpack/dev.config.js
```js
    plugins: [
      ...,
      new HtmlWebpackPlugin(settings.htmlPlugin)
    ] 
```

index.html
```html
<body>
    ...
    <% for (let path of htmlWebpackPlugin.files.js) { %>
    <script src="<%=path %>" type="text/javascript"></script>
    <% } %>
</body>
```

* Optimization: minimization and uglyfying

webpack/prod.config.js
```js
    plugins: [
      ...,
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
    ],
    optimization: {
      minimizer: [
        new TerserJsPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6
          }
        })
      ]
    }
```

* Optimization: version control

webpack/prod.config.js
```js
const gitRevisionPlugin = new GitRevisionPlugin({ branch: true, lightweightTags: true });
const versionComment = '/* Version ' + gitRevisionPlugin.version() + '; branch: ' +
  gitRevisionPlugin.branch() + '; commit hash: ' + gitRevisionPlugin.commithash() + ' */';


    plugins: [
      ...,
      new WrapperPlugin({
        header: versionComment + '\r\n'
      })
    ]
```

### Install style

package.json
```json
  "devDependencies": {
    ...
    "css-loader": "^2.1.1",
    "mini-css-extract-plugin": "0.6.0",
    "node-sass": "^4.11.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    ...
  }
```

webpack/base.config.js
```js
    module: {
      rules: [
        ...,
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
          test: /\.(png|gif|jpe?g)$/,
          use: ['file-loader?publicPath=../&name=img/[hash].[ext]']
        },
        {
          test: /\.(svg|woff|woff2|eot|ttf)$/,
          use: ['file-loader?publicPath=../&name=fonts/[hash].[ext]?' + Date.now()]
        }
      ]
    }
```

webpack/dev.config.js
```js
    plugins: [
      ...,
      new MiniCssExtractPlugin({
        filename: './css/[name].[contenthash]' + settings.resourcePrefix + '.css',
        chunkFilename: './css/[id]' + settings.resourcePrefix + '.css',
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
```

webpack/prod.config.js
```js
    plugins: [
      ...,
      new MiniCssExtractPlugin({
        filename: './css/[name].bundle' + settings.resourcePrefix + '.css',
        allChunks: true
      })
    ],
    optimization: {
      minimizer: [
        ...,
        new OptimizeCssAssetsPlugin({})
      ]
    }
```

index.html
```html
<head>
    ...
    <% for (let path of htmlWebpackPlugin.files.css) { %>
    <link rel="stylesheet" type="text/css" href="<%=path %>"/>
    <% } %>
</head>
```

### Install React

package.json
```json
  "dependencies": {
    ...
    "prop-types": "^15.7.2",
    "react": "^16.8.5",
    "react-dom": "^16.8.5",
    "react-tooltip": "^3.10.0",
    ...
  }
```

### Install Redux

package.json
```json
  "dependencies": {
    ...
    "react-redux": "^6.0.1",
    "redux": "^4.0.1",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0",
    ...
  },
  "devDependencies": {
    ...
    "redux-devtools-extension": "^2.13.8",
    ...
  }
```

### Install Router

package.json
```json
  "dependencies": {
    ...
    "connected-react-router": "^6.4.0",
    "react-router": "^5.0.0",
    "react-router-dom": "^5.0.0",
    ...
  },
  "devDependencies": {
    ...
    "history": "^4.9.0",
    ...
  }
```

* Routing with store history

stores/configureStore.js
```js
+ import { connectRouter, routerMiddleware } from 'connected-react-router';
  ... 
+ import { createHashHistory } from 'history';


+ export const history = createHashHistory();

  const middlware = [
    thunkMiddleware,
+   routerMiddleware(history)
  ];
  
  const reducers = combineReducers({
    app: rootReducer,
+   router: connectRouter(history)
  });
```

index.js
```js
+ import { ConnectedRouter } from 'connected-react-router';

+ import configureStore, { history } from './stores/configureStore';

  const store = configureStore();

  function render (Component) {
    ReactDOM.render(
      <Provider store={store}>
+       <ConnectedRouter history={history}>
          <Component/>
+       </ConnectedRouter>
      </Provider>,
      document.getElementById('app')
    );
  }
```

* Parse query from uri

package.json
```json
  "devDependencies": {
    ...,
    "query-string": "^5.1.1",
    ...
  }
```

~utils/ParseUtils.js
```js
import queryString from 'query-string';

export const parseQuery = (location) =>
  location && location !== null && typeof location === 'object' && location.search ?
    queryString.parse(location.search) : {};
```

> use
```js
import { parseQuery } from '~utils/ParseUtils';

export default connect((state) => ({
  query: parseQuery(state.router.location),
  ...
}))(Component);
```



** We need version 5 because newest versions crash vendor bundle in IE

** If you sure that you code could not run under IE or other older browser use `query-string@6` or newer
 

### Install Babel

package.json
```json
  "devDependencies": {
    "@babel/core": "^7.4.0",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "^7.4.2",
    "@babel/preset-react": "^7.0.0",
    "@babel/register": "^7.4.0",
    "acorn": "^6.1.1",
    "acorn-dynamic-import": "^4.0.0",
    "babel-loader": "^8.0.5",
    ...
  }
```

.babelrc
```json
{
  "presets": [
    ["@babel/env", { "modules": false, "loose": true }],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

webpack/base.config.js
```js
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: [
                loaders.getCacheLoader(path.resolve(settings.cacheDir, 'js')),
                loaders.getThreadLoader('js'),
+               {
+                 loader: 'babel-loader',
+                 options: {
+                   cacheDirectory: path.resolve(settings.cacheDir, 'babel')
+                 }
+               }
              ]
            }
          ]
        }
```

* Component lazy initialization

```js
import React, { Component, Suspense } from 'react';

const DynamicComponent = React.lazy(() => import('../DynamicComponent'));

class App extends Component {
  
  render () {
      ...
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
      ...
  }
}
``` 

** `acorn` and `acorn-dynamic-import` were used for work `@babel/plugin-syntax-dynamic-import` cause `webpack@^4.28` throw exception

### Install Eslint

package.json
```json
  "scripts": {
    ...,
    "eslint": "eslint ./app ./test ./webpack",
    "eslint:fix": "npm run eslint -- --fix"
  },
  "devDependencies": {
    ...
    "babel-eslint": "^10.0.1",
    "eslint": "^5.16.0",
    "eslint-loader": "^2.1.2",
    ...
  },
  "eslintConfig": ".eslintrc.json"
```

### Install test

package.json
```json
  "scripts": {
    ...,
    "test": "jest",
  },
  "devDependencies": {
    ...
    "babel-jest": "^24.8.0",
    "enzyme": "^3.10.0",
    "enzyme-adapter-react-16": "^1.14.0",
    "enzyme-to-json": "^3.3.5",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^24.8.0",
    "jest-fetch-mock": "^2.1.2",
    "jest-localstorage-mock": "^2.4.0",
    "raf": "^3.4.1",
    "redux-mock-store": "^1.5.3",
    "sinon": "^7.3.2",
    ...
  }
```

.babelrc
```json
 {
+  "env": {
+    "test": {
+      "presets": [
+        ["@babel/env", { "modules": "commonjs"}],
+        "@babel/preset-react"
+      ],
+      "plugins": [
+        "@babel/plugin-proposal-class-properties",
+        "@babel/plugin-syntax-dynamic-import"
+      ]
+    }
+  },
   "presets": [
     ["@babel/env", { "modules": false, "loose": true }],
     "@babel/preset-react"
   ],
   "plugins": [
     "@babel/plugin-proposal-class-properties",
     "@babel/plugin-syntax-dynamic-import"
   ]
 }
```

.eslintrc.json
```json
   "env": {
     ...,
+    "jest": true
   },
```


jest.config.js
```js
{
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover'
  ],
  globals: {
    __DEBUG__: 'true'
  },
  moduleNameMapper: {
    ...,
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  roots: [
    '<rootDir>/test'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/enzyme.config.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  testMatch: [
    '**/test/**/*Test.js'
  ],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks/fileTransformer.js',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
```

test/enzyme.config.js
```js
require('raf/polyfill');
require('jest-localstorage-mock');

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.fetch = require('jest-fetch-mock');
```

test/__mocks/fileTransformer.js
```js
const path = require('path');

module.exports = {
  process (src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  }
};
```

* Idea configuration 
<img src="https://api.monosnap.com/file/download?id=swpRsy3RpL0ItSaqcU0oZQdB97qbtr">

### Install clear

package.json
```json
  "scripts": {
    ...,
    "clear": "rimraf .cache && rimraf node_modules/.cache && rimraf dist && rimraf coverage",
    "clear:build": "rimraf dist && npm run webpack:build",
    "clear:test": "rimraf coverage/** && npm run test",
  },
  "devDependencies": {
    ...
    "rimraf": "^2.6.3",
    ...
  }
```

### Install Ant Design

package.json
```json
  "devDependencies": {
    ...
    "antd": "^3.19.3",
    "babel-plugin-import": "^1.12.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "moment": "^2.24.0",
    ...
  }
```

webpack/base.config.js
```js
    module: {
      rules: [
        ...
+        {
+          test: /\.less$/,
+          use: [
+            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'css')),
+            loaders.getThreadLoader('css'),
+            'style-loader',
+            MiniCssExtractPlugin.loader,
+            'css-loader',
+            {
+              loader: 'less-loader',
+              options: {
+                javascriptEnabled: true
+              }
+            }
+          ]
+        },
      ...
      ]
    }
```

 .babelrc
```json
   "plugins": [
     "@babel/plugin-proposal-class-properties",
     "@babel/plugin-syntax-dynamic-import",
+    [
+      "import",
+      {
+        "libraryName": "antd",
+        "style": true
+      }
+    ]
   ]
 }
```

* language customization

app/src/index.js
```js
...
+ import { LocaleProvider } from 'antd';
+ import moment from 'moment';
+ import ruRu from 'antd/lib/locale-provider/ru_RU';
+ import 'moment/locale/ru';

...

+ moment.locale('ru');

...

  ReactDOM.render(
    <Provider store={store}>
+      <LocaleProvider locale={ruRu}>
        <ConnectedRouter history={history}>
          <Component/>
        </ConnectedRouter>
+      </LocaleProvider>
    </Provider>,
    document.getElementById('app')
  );
```
