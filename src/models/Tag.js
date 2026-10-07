import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Tag = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: { len: [2, 30] },
    },
  },
  {
    tableName: "tags",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Tag;
