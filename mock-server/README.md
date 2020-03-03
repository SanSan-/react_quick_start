# Mock-server for local development and testing

### How to work

* install all dependencies. run `npm i`

* edit `webpack/dev.config.ts`: change `devServer`->`proxy`->`target` to `http://localhost:8000`

* run `start`

* wait until show message `APP MOCKS LISTEN ON PORT: 8000`

* run main application (in root folder): `npm run webpack:start` 

`npm run start` - run ExpressJs-server on port 8000. Server send response on GET- or POST- request. List of responses is here:

* get info API: `/api/get/info`
