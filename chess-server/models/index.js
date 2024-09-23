const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/js_pern_fect_chess_db",
  {
    dialect: "postgres",
  }
);
module.exports = sequelize;
