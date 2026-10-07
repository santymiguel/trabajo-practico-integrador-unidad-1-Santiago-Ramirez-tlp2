import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ArticleTag = sequelize.define(
  "ArticleTag",
  {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "article_tags",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default ArticleTag;
