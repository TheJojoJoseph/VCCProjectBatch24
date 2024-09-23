const studentService = require("../services/studentService");
const { responseParser } = require("../../utils/responseParser");

//Handles request to add a Student
module.exports.addStudent = async (req, res) => {
  let result;
  try {
    let payload = req.body;
    let response = await studentService.addStudent(payload);
    result = responseParser("Successfully added student", false, response);
  } catch (error) {
    result = responseParser("Failed to add student", true, error);
  }
  res.status(result.code).json(result);
};

//Handles request to add a Students
module.exports.listStudents = async (req, res) => {
  let result;
  try {
    let payload = req.body;
    let response = await studentService.listStudents(payload);
    result = responseParser("Successfully fetched students", false, response);
  } catch (error) {
    result = responseParser("Failed to fetch student", true, error);
  }
  res.status(result.code).json(result);
};

module.exports.matrixMultiply = async (req, res) => {
  let result;
  try {
    async function generateMatrix(size) {
      let matrix = new Array(size)
        .fill()
        .map(() => new Array(size).fill().map(() => Math.random()));
      return matrix;
    }

    // Function to multiply two matrices
    function multiplyMatrices(A, B) {
      let size = A.length;
      let result = new Array(size).fill().map(() => new Array(size).fill(0));

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          for (let k = 0; k < size; k++) {
            result[i][j] += A[i][k] * B[k][j];
          }
        }
      }
      return result;
    }

    const A = await generateMatrix(500);
    const B = await generateMatrix(500);
    result = await multiplyMatrices(A, B);

    result = responseParser("Successfully fetched students", false, {
      response:  0,
    });
  } catch (error) {
    console.log(error);
    result = responseParser("Failed to fetch student", true, error);
  }
  res.status(result.code).json(result);
};
