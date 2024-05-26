// const { Sequelize,DataTypes } = require("sequelize");

// const sequelize = new Sequelize('sqlite::memory:');

// const User = sequelize.define('User',{
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement : true,
//         primaryKey : true,
//         allowNull:false
//     },
//     name:{
//         type : DataTypes.STRING,
//         allowNull: false
//     },
//     email:{
//         type : DataTypes.STRING,
//         allowNull: false
//     },
//     password:{
//         type : DataTypes.STRING,
//         allowNull: false
//     },
// });

// async()=>{
//     await User.sync({force:false});
// }

// module.exports = User

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      registration_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return user;
};
