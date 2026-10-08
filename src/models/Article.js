import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Article = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [3, 200],
      },
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [50],
      },
    },

    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("published", "archived"),
      allowNull: false,
      defaultValue: "published",
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "articles",

    timestamps: true,

    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Article;
