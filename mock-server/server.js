const express = require('express');
const app = express();

const port = 3003;
require('./app/routes')(app);
app.listen(port, () => {
    console.log('APP MOCKS LISTEN ON PORT: ' + port);
});
