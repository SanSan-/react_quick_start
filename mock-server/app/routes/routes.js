const mockToken = require('./mock/mockToken');
const mockAuth = require('./mock/mockAuth');
const mockUserInfo = require('./mock/mockUserInfo');
const mockInfo = require('./mock/mockInfo');
const mockTable = require('./mock/mockTable');

module.exports = (app) => {

  const createPostRoute = (link, response) => {
    return app.post(link, (req, res) => res.send(response));
  };

  const createPageablePostRoute = (link, mock, key) => {
    return app.post(link, (req, res) => {
      const pageNum = parseInt(req.body.pageNum, 0) || 0;
      const pageSize = parseInt(req.body.pageSize, 10) || 10;
      const totalRecords = mock[key].length;
      const pageNumbers = Math.ceil(totalRecords / pageSize);
      const currentPage = pageNumbers <= pageNum ? pageNumbers - 1 : pageNum;
      const beginSlice = currentPage * pageSize;
      const endSlice = pageSize + currentPage * pageSize;
      const response = {
        responseStatus: 'SUCCESS',
        pagination: {
          pageNum: currentPage,
          pageSize: pageSize,
          totalRecords: totalRecords
        },
        [key]: Array.from(mock[key]).slice(beginSlice, endSlice)
      };
      res.send(response);
    });
  };

  const createGetRoute = (link, response) => {
    return app.get(link, (req, res) => res.send(response));
  };

  app.get('/api/csrfToken/get', (req, res) => {
    if (req.query['moduleId'] === 'new-begin') {
      res.send(mockToken.getCsrfToken);
    }
  });

  createPostRoute('/api/login', mockAuth.getSuccessLogin);
  createPostRoute('/api/logout', mockAuth.getSuccessLogout);
  createPostRoute('/api/invoke/new-begin/user/get', mockUserInfo.getUserInfo);
  createPostRoute('/api/invoke/new-begin/user/rights/get', mockUserInfo.getUserRights);
  createGetRoute('/api/invoke/new-begin/info/get', mockInfo.getInfo);
  createGetRoute('/api/user/auth/token', mockToken.getJwtToken);
  createGetRoute('/api/user/auth/refresh', mockToken.getJwtToken);
  createGetRoute('/api/settings/general', mockUserInfo.getGeneralSettings);
  createGetRoute('/api/settings/personal', mockUserInfo.getPersonalSettings);
  createPageablePostRoute('/api/invoke/new-begin/rosters/find', mockTable.getRows, 'rows');
};
