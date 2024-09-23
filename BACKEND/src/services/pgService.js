const postgres = require("../clients/pgClient");
const mustache = require("mustache");

//Service to add a Student to PG
module.exports.addStudent = async (payload) => {
  try {
    query = mustache.render(
      "insert into students (name, age, class) values ('{{name}}', {{age}}, '{{class}}')",
      { ...payload }
    );
    let data = await postgres.query(query);
    data = data.rows;
    return { data };
  } catch (error) {
    throw error;
  }
};

//Service to add a Student to PG
module.exports.listStudents = async (payload) => {
  try {
    query = mustache.render("select * from students limit {{limit}} offset {{offset}}",
    { ...payload }
  );
    countQuery = "select count(*) as COUNT from students";
    let totalCount = await postgres.query(countQuery);
    totalCount = totalCount.rows;
    let data = await postgres.query(query);
    data = data.rows;
    return { data, totalCount };
  } catch (error) {
    throw error;
  }
};
