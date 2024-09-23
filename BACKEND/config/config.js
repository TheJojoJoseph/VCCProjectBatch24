module.exports.PG_USERNAME = process.env.PG_USERNAME ? process.env.PG_USERNAME : "postgres";
module.exports.PG_PASSWORD = process.env.PG_PASSWORD ? process.env.PG_PASSWORD : "fact123";
module.exports.DATABASE = process.env.DATABASE ? process.env.DATABASE : "student_inventory";
module.exports.PG_HOST = process.env.PG_HOST ? process.env.PG_HOST : "localhost";
module.exports.PG_PORT = process.env.PG_PORT ? process.env.PG_PORT : "5432";

module.exports.HOST = process.env.HOST ? process.env.HOST : "localhost";
module.exports.PORT = process.env.PORT ? process.env.PORT : 5001;