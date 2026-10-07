import User from "../models/User";
import Profile from "../models/Profile";
import Article from "../models/Article";
import Tag from "../models/Tag";
import ArticleTag from "../models/ArticleTag";

User.hasOne(Profile, { foreignKey: "user_id" });
Profile.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Article, { foreignKey: "user_id" });
Article.belongsTo(User, { foreignKey: "user_id" });

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "tag_id",
});
Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "article_id",
});
