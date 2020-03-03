# [typescript 3, webpack 4, react-16, redux 4, react-router 5, babel 7, jest 25, enzyme 3, antd 3] Quick starter

### Introduction

This is quick start bundle for quick start development without noisy initialization of project (it may take several days) 

### Bundle include:
* main
- bundler:: webpack 4
- view:: react 16.12
- routing:: react-router 5
- state storing:: redux 4, redux-thunk 2.3
- history routing:: history 4.10, connected-react-router 6.6 
- type checking:: typescript 3.8
- js-compiler:: babel 7
* test
- test manager:: jest 25.1
- test environments:: enzyme 3, sinon 7
- static lint checking:: eslint 6.8
* decoration
- components:: antd 3.26
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
    "acorn": "7.1.1",
    "cache-loader": "4.1.0",
    "git-revision-webpack-plugin": "3.0.3",
    "html-webpack-plugin": "3.2.0",
    "terser-webpack-plugin": "2.3.5",
    "thread-loader": "2.1.3",
    "webpack": "4.42.0",
    "webpack-cli": "3.3.11",
    "webpack-dev-server": "3.10.3",
    "webpack-merge": "4.2.2",
    "wrapper-webpack-plugin": "2.1.0"
    ...
  }
```

* Optimization: increase speed of build

webpack/settings.ts
```js
const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');

const threadLoader = { workerParallelJobs: 50, poolRespawn: false };
```

webpack/loaders.ts
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

webpack/base.config.ts
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

webpack/base.config.ts
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

webpack/settings.ts
```js
const htmlPlugin = {
  inject: false,
  hash: true,
  template: './app/src/index.html',
  filename: 'index.html',
  favicon: './app/resources/favicon.ico'
};
```

webpack/prod.config.ts or webpack/dev.config.js
```js
    plugins: [
      ...,
      new Htmldev.config.ts(settings.htmlPlugin)
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

webpack/prod.config.ts
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

webpack/prod.config.ts
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
    "css-loader": "3.4.2",
    "mini-css-extract-plugin": "0.6.0",
    "node-sass": "4.13.1",
    "optimize-css-assets-webpack-plugin": "5.0.3",
    "sass-loader": "8.0.2",
    "style-loader": "1.1.3",
    ...
  }
```

webpack/base.config.ts
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
      new Minidev.config.tsgin({
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

webpack/prod.config.ts
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
    "prop-types": "15.7.2",
    "react": "16.12.0",
    "react-dom": "16.12.0",
    "react-tooltip": "^3.10.0",
    ...
  }
```

### Install Redux

package.json
```json
  "dependencies": {
    ...
    "react-redux": "7.2.0",
    "redux": "4.0.5",
    "redux-thunk": "2.3.0"
    ...
  },
  "devDependencies": {
    ...
    "redux-devtools-extension": "2.13.8",
    ...
  }
```

### Install Router

package.json
```json
  "dependencies": {
    ...
    "connected-react-router": "6.6.1",
    "react-router": "5.1.2",
    "react-router-dom": "5.1.2",
    ...
  },
  "devDependencies": {
    ...
    "history": "4.10.1",
    ...
  }
```

* Routing with store history

stores/configureStore.ts
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

index.ts
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
    "query-string": "5.1.1",
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
    ...
    "@babel/core": "7.8.6",
    "@babel/plugin-proposal-class-properties": "7.8.3",
    "@babel/plugin-syntax-dynamic-import": "7.8.3",
    "@babel/preset-env": "7.8.6",
    "@babel/preset-react": "7.8.3",
    "@babel/register": "7.8.6",
    "acorn-dynamic-import": "4.0.0",
    "babel-loader": "8.0.6",
    ...
  },
  "browserslist": [
    "last 1 version",
    "ie 11"
  ],
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

webpack/base.config.ts
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
    "babel-eslint": "10.0.1",
    "eslint": "6.8.0",
    "eslint-loader": "3.0.3",
    "eslint-plugin-babel": "5.3.0",
    "eslint-plugin-react": "7.18.3",
    ...
  },
  "eslintConfig": ".eslintrc.json"
```

.eslintrc.json
```json
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "globalReturn": false,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "commonjs": true,
    "browser": true,
    "jquery": false,
    "node": true,
    "es6": true
  },
  "globals": {
    "global": true,
    ...
  },
  "plugins": [
    "babel",
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  ...
```

webpack/base.config.ts
```js
    module: {
      rules: [
        ...,
+       {
+         test: /\.jsx?$/,
+         use: ['eslint-loader'],
+         exclude: /(node_modules)/
+       }
      ]
    }
```

### Testing

package.json
```json
  "scripts": {
    ...,
    "test": "jest",
  },
  "devDependencies": {
    ...
    "babel-jest": "25.1.0",
    "enzyme": "3.11.0",
    "enzyme-adapter-react-16": "1.15.2",
    "enzyme-to-json": "3.4.4",
    "identity-obj-proxy": "3.0.0",
    "jest": "25.1.0",
    "jest-fetch-mock": "3.0.1",
    "jest-localstorage-mock": "2.4.0",
    "raf": "3.4.1",
    "redux-mock-store": "1.5.4",
    "sinon": "9.0.0",
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
    enzyme.config.tsenzyme.config.tsSerializers: [
    'enzyme-to-json/serializer'
  ],
  testMatch: [
    '**/test/**/*Test.js'
  ],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': fileTransformer.js,
    fileTransformer.js 'babel-jest'
  }
}
```

test/enzyme.config.js
enzyme.config.tsaf/polyfill');
require('jest-localstorage-mock');

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.fetch = require('jest-fetch-mock');
```

test/__mocks/fileTransformer.js
```js
fileTransformer.tsre('path');

module.exports = {
  process (src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  }
};
```

* Idea configuration 
<img src="https://api.monosnap.com/file/download?id=swpRsy3RpL0ItSaqcU0oZQdB97qbtr">

### Cleaning

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
    "rimraf": "3.0.2",
    ...
  }
```

### Install Ant Design

package.json
```json
  "devDependencies": {
    ...
    "antd": "3.26.12",
    "babel-plugin-import": "1.13.0",
    "less": "3.11.1",
    "less-loader": "5.0.0",
    "moment": "2.24.0",
    ...
  }
```

webpack/base.config.ts
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

`app/src/index.ts`
```js
...
+ import { ConfigProvider } from 'antd';
+ import moment from 'moment';
+ import ruRu from 'antd/lib/locale-provider/ru_RU';
+ import 'moment/locale/ru';

...

+ moment.locale('ru');

...

  ReactDOM.render(
    <Provider store={store}>
+      <ConfigProvider locale={ruRu}>
        <ConnectedRouter history={history}>
          <Component/>
        </ConnectedRouter>
+      </ConfigProvider>
    </Provider>,
    document.getElementById('app')
  );
```

### Typescript migration

* Install Typescript

package.json
```json
  "dependencies": 
    "connected-react-router": "6.6.1",
-   "prop-types": "^15.7.2",
  "devDependencies": {
    ...
+   "@babel/preset-typescript": "7.8.3",
+   "@types/enzyme": "3.10.5",
+   "@types/enzyme-adapter-react-16": "1.0.6",
+   "@types/fetch-mock": "7.3.2",
+   "@types/jest": "25.1.3",
+   "@types/react": "16.9.23",
+   "@types/react-dom": "16.9.5",
+   "@types/react-redux": "7.1.7",
+   "@types/react-router-dom": "4.3.5",
+   "@types/redux-mock-store": "1.0.2",
+   "@types/sinon": "7.5.2",
+   "@types/webpack": "4.41.7",
+   "@types/webpack-dev-server": "3.10.0",
+   "@types/webpack-env": "1.15.1",
+   "@types/webpack-merge": "4.1.5",
    ...
+   "@typescript-eslint/eslint-plugin": "2.21.0",
+   "@typescript-eslint/parser": "2.21.0",
    ...
-   "babel-eslint": "10.0.1",
-   "eslint-plugin-babel": "5.3.0",
    ...
+   "jest-sonar-reporter": "2.0.0",
+   "source-map-loader": "0.2.4",
+   "typescript": "3.8.3",
    ...
  }
  ...
  "main": "app/src/index.ts",
  "scripts": {
    "webpack:start": "webpack-dev-server --progress --colors --config ./webpack/dev.config.ts",
    "webpack:build": "webpack --config ./webpack/prod.config.ts",
    ...
    "eslint": "eslint ./app/**/*.{ts,tsx} ./webpack/*.ts ./test/**/*.{ts,tsx} ",
  }
```

tsconfig.json
```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "app",
    "sourceMap": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "strict": true,
    "strictNullChecks": false,
    "typeRoots": [
      "node_modules/@types",
      "app/@types"
    ],
    "baseUrl": ".",
    "paths": {
      "~app*": ["app*"],
      "~src*": ["app/src*"],
      "~actions*": ["app/src/actions*"],
      "~components*": ["app/src/components*"],
      "~const*": ["app/src/constants*"],
      "~dictionaries*": ["app/src/dictionaries*"],
      "~forms*": ["app/src/forms*"],
      "~reducers*": ["app/src/reducers*"],
      "~types*": ["app/src/types*"],
      "~utils*": ["app/src/utils*"],
      "~mock*": ["mock-server/app/routes/mock*"],
      "~test*": ["test*"]
    },
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": [
    "./app/**/*",
    "./webpack/**/*",
    "./test/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

.babelrc
```json
  "presets": [
   ...
+  "@babel/preset-typescript"
   ]
```

.eslintrc.json
```json
-  "parser": "babel-eslint",
+  "parser": "@typescript-eslint/parser",
-  "parserOptions": {	  
-   "ecmaVersion": 7,	    
-   "sourceType": "module",	
-   "ecmaFeatures": {	
-     "jsx": true,	
-     "globalReturn": false,	
-     "experimentalObjectRestSpread": true	
-   }
+  "parserOptions": {
+  "project": "./tsconfig.json"
   ...
   "plugins": [
-     "babel",
-     "react"
+     "@typescript-eslint",
+     "react-hooks",
   ...
   "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
+     "plugin:react/recommended",
+     "plugin:@typescript-eslint/eslint-recommended",
+     "plugin:@typescript-eslint/recommended",
+     "plugin:@typescript-eslint/recommended-requiring-type-checking"
   ...
  "settings": {
    "react": {
      "version": "detect"
    }
  }
  ... & etc changes of rules
}
```

.jest.config.js
```json
  moduleNameMapper: {
  ...
    '^~types(.*)$': '<rootDir>/app/src/types$1',
  },
  ...
  setupFilesAfterEnv: [
    '<rootDir>/test/enzyme.config.ts'
  ],
  ...
  testMatch: [
    '**/test/**/*Test.ts',
    '**/test/**/*Test.tsx'
  ],
  ...
  testResultsProcessor: 'jest-sonar-reporter',
  ...
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__transformers/fileTransformer.js',
    '^.+\\.tsx?$': 'babel-jest'
  }
```

webpack/base.config.ts
```js
    entry: {
      app: path.resolve(settings.rootDir, 'app', 'src', 'index.tsx')
    },
    ...
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
    ...
    resolve: {
      alias: settings.aliases,
      extensions: ['.ts', '.tsx', '.js']
    },
```

* Sonar settings (Maven 3 `pom.xml`)

```xml
  <sonar.sources>app</sonar.sources>
  <sonar.projectKey>new-begining</sonar.projectKey>
  <sonar.inclusions>app/src/**</sonar.inclusions>
- <sonar.javascript.lcov.reportPath>coverage/lcov.info</sonar.javascript.lcov.reportPath>
+ <sonar.typescript.lcov.reportPath>coverage/lcov.info</sonar.typescript.lcov.reportPath>
+ <sonar.testExecutionReportPaths>test-report.xml</sonar.testExecutionReportPaths>
```

### async/await Install

package.json
```json
  "devDependencies": {
    ...
    "@babel/plugin-transform-runtime": "7.8.3",
    "@babel/runtime": "7.8.4",
    ...
  }
```

.babelrc
```json
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
+   [
+     "@babel/plugin-transform-runtime",
+     {
+       "regenerator": true
+     }
+   ],
```
