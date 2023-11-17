require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_SECRET,
    database: "kpopular",
    charset: "utf8",
  },
};
