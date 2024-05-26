const dbConfig = require("../config/dbconfig");
require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

//connecting database with sequelize orm--------------
// const sequelize = new Sequelize(
//   process.env.DB,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: "mysql",
//     operatorAliases: false,
//     // pool: {
//     //   max: dbConfig.pool.max,
//     //   min: dbConfig.pool.min,
//     //   acquire: dbConfig.pool.acquire,
//     //   idle: dbConfig.pool.idle,
//     // },
//   }
// );

const sequelize = new Sequelize({
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  dialect: "mysql",
  port: process.env.DB_PORT,
  host: process.env.HOST,
});

const db = {}; // creating database object

db.Sequelize = Sequelize; //Sequelize class
db.sequelize = sequelize; //sequelize object

//enter db.tablename

db.user = require("./User.js")(sequelize, DataTypes);
db.products = require("./products.js")(sequelize, DataTypes);
db.transactions = require("./transactions.js")(sequelize, DataTypes);
db.bookings = require("./booking.js")(sequelize, DataTypes);

//ASSOCIATIONS HERE
// db.project.hasOne(db.match);
// db.match.belongsTo(db.project);

//many to many association, fav will be middle table,which will have two foreign keys.
// db.user.belongsToMany(db.products, { through: db.transactions });
// db.products.belongsToMany(db.user, { through: db.transactions });

// db.user.belongsToMany(db.products, { through: db.bookings });
// db.products.belongsToMany(db.user, { through: db.bookings });

db.user.belongsToMany(db.products, { through: db.bookings });
db.products.belongsToMany(db.user, { through: db.bookings });
db.bookings.belongsTo(db.user);
db.bookings.belongsTo(db.products);

// below authenticate function  is used to check the connection to the database and verify whether the provided credentials (username, password, database, etc.) are valid.

sequelize
  .authenticate()
  .then(() => {
    console.log("connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//sequelize.sync  used to synchronize sequelize models with database tables.
db.sequelize.sync({ force: false }).then(() => {
  console.log("sync done");
}); //if set true create drop old table and creates new tables at each time.

module.exports = db;
