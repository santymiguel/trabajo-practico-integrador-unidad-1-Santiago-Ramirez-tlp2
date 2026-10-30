import express from "express";
import {
  deleteTag,
  getTag,
  getTags,
  postTag,
  putTag,
} from "../controllers/tags.controller.js";
import { adminMiddleware } from "../middleware/validation/adminMiddleware .js";
import { authMiddleware } from "../middleware/validation/authMiddleware.js";
import {
  validationPostTag,
  validationPutTag,
} from "../middleware/validation.Tags.js";
import { validate } from "../middleware/validate.js";
// se importan los controladores

export const tagsRouter = express.Router();

tagsRouter.get("/", authMiddleware, getTags);
tagsRouter.get("/:id", adminMiddleware, getTag);

tagsRouter.post("/", adminMiddleware, validationPostTag, validate, postTag);

tagsRouter.put("/:id", adminMiddleware, validationPutTag, validate, putTag);

tagsRouter.delete("/:id", adminMiddleware, deleteTag);
