import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Article from "./Article.js";

const ArticleTag = sequelize.define(
  "ArticleTag",
  {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "articles",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "article_tags",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default ArticleTag;
