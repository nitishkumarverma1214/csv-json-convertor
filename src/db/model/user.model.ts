import { DataTypes } from "sequelize";
import { sequelize } from "../index";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
