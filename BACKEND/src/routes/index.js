const express = require("express");

const router = new express.Router();
const baseUrl = "/api";

//import route files
const studentRoute = require(`./studentRoute`);

//register routes
router.use(baseUrl, studentRoute);

module.exports = router;
