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

  createGetRoute('/api/get/info', mockInfo.getInfo);
  createPageablePostRoute('/api/get/table', mockTable.getRows, 'rows');
};
