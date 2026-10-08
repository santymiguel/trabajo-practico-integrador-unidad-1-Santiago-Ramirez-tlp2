import express from "express";
import {
  deleteTag,
  getTag,
  getTags,
  postTag,
  putTag,
} from "../controllers/tags.controller";
// se importan los controladores

export const tagsRouter = express.Router();

tagsRouter.get("/", getTags);
tagsRouter.get("/:id", getTag);

tagsRouter.post("/", postTag);

tagsRouter.put("/:id", putTag);

tagsRouter.delete("/:id", deleteTag);
