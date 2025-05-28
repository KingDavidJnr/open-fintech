"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define associations here if needed later
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );
  return User;
};
