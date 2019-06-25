const mockInfo = require('./mock/mockInfo');

module.exports = (app) => {

  const createPostRoute = (link, response) => {
    return app.post(link, (req, res) => res.send(response));
  };

  const createGetRoute = (link, response) => {
    return app.get(link, (req, res) => res.send(response));
  };

  createGetRoute('/api/get/info', mockInfo.getInfo);
};
