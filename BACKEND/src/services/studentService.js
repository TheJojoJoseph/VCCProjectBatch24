const pgService = require("../services/pgService");

//Service to add a Student
module.exports.addStudent = async (payload) => {
  try {
    let response = await pgService.addStudent(payload);
    return response;
  } catch (error) {
    throw error;
  }
};

//Service to list Students
module.exports.listStudents = async (payload) => {
    try {
      const limit  = payload.limit;
      const offset = payload.offset;
      let response = await pgService.listStudents(payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
  