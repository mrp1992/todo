const express = require('express');
const bodyParser = require('body-parser');
var routes = require('./todoRoutes/route');

const app = express();


const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes.addTodo(app);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}!`));
