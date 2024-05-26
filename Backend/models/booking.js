module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define("booking", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  return booking;
};
