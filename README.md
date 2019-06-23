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

### Webpack dependencies

package.json
```
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
```

### Style dependencies

package.json
```
    "css-loader": "^2.1.1",
    "mini-css-extract-plugin": "0.6.0",
    "node-sass": "^4.11.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
```

### React dependencies

package.json
```
    "prop-types": "^15.7.2",
    "react": "^16.8.5",
    "react-dom": "^16.8.5",
    "react-tooltip": "^3.10.0",
```

### Redux dependencies

package.json
```
    "react-redux": "^6.0.1",
    "redux": "^4.0.1",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0",
    
    ...
    
    "redux-devtools-extension": "^2.13.8",
```

### Router dependencies

package.json
```
    "connected-react-router": "^6.4.0",
    "react-router": "^5.0.0",
    "react-router-dom": "^5.0.0",
    "history": "^4.9.0",
```

### Babel dependencies

package.json
```
    "@babel/core": "^7.4.0",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "^7.4.2",
    "@babel/preset-react": "^7.0.0",
    "@babel/register": "^7.4.0",
    "acorn": "^6.1.1",
    "acorn-dynamic-import": "^4.0.0",
    "babel-loader": "^8.0.5",
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

* `acorn` and `acorn-dynamic-import` were used for work `@babel/plugin-syntax-dynamic-import` cause `webpack@^4.28` throw exception

### Eslint dependencies

package.json
```
  "devDependencies": {
    ...
    "babel-eslint": "^10.0.1",
    "eslint": "^5.16.0",
    "eslint-loader": "^2.1.2",
    ...
  },
  "eslintConfig": ".eslintrc.json"
```

### Test dependencies

package.json
```
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
    '^~src(.*)$': '<rootDir>/app/src$1',
    '^~app(.*)$': '<rootDir>/app$1',
    '^~components(.*)$': '<rootDir>/app/src/components$1',
    '^~stores(.*)$': '<rootDir>/app/src/stores$1',
    '^~mock(.*)$': '<rootDir>/mock-server/app/routes/mock$1',
    '^~test(.*)$': '<rootDir>/test$1',
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

### Ant Design dependencies

package.json
```
    "antd": "^3.19.3",
    "babel-plugin-import": "^1.12.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "moment": "^2.24.0",
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
