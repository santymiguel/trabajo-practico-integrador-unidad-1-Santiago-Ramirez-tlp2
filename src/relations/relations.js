import User from "../models/User";
import Profile from "../models/Profile";
import Article from "../models/Article";
import Tag from "../models/Tag";
import ArticleTag from "../models/ArticleTag";

User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Article, { foreignKey: "user_id", as: "articles" });
Article.belongsTo(User, { foreignKey: "user_id", as: "author" });

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "tag_id",
  as: "articles",
});
Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "article_id",
  as: "tags",
});
