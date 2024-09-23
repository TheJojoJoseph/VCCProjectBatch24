const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const config = require("./config/config");
const routes = require("./src/routes");

const app = express();
const port = config.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log("Server up @ ", config.HOST);
});
