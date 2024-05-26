module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define("transaction", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    borrow_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    return_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    registration_id: {
      type: DataTypes.STRING,
    },
    itemName: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    itemId: {
      type: DataTypes.INTEGER,
    },
  });

  return transaction;
};
