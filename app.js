import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./src/relations/relations.js";
import { usersRouter } from "./src/routes/users.routes.js";
import { tagsRouter } from "./src/routes/tags.routes.js";
import { articlesRouter } from "./src/routes/articles.routes.js";
import { articlesTagRouter } from "./src/routes/articlesTag.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/articles-tags", articlesTagRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});

export default app;
