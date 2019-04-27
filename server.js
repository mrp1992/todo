const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const port = 8000;

var routes = require('./todoRoutes/route');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
