const router = require("express").Router();
const handler = require("../handlers/studentHandler");

router.post("/addStudent", handler.addStudent);
router.post("/listStudents", handler.listStudents);
router.get("/matrixMultiply", handler.matrixMultiply);

module.exports = router;