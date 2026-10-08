import express from "express";
// se importan los controladores

export const tagsRouter = express.Router();

tagsRouter.get("/", getTags);
tagsRouter.get("/:id", getTag);

tagsRouter.post("/", postTag);

tagsRouter.put("/:id", putTag);

tagsRouter.delete("/:id", deleteTag);
