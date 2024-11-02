import { Router } from "express";
import {
  getAllPost,
  getPostById,
  createPost,
  deleteAPost,
  editPostDetails,
  editPostImage,
} from "../controllers/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/").get(getAllPost).post(upload.single("picture"), createPost);

router.route("/post/:postId").get(getPostById);

router.route("/:postId").patch(editPostDetails).delete(deleteAPost);

router.route("/img/:postId").patch(upload.single("picture"), editPostImage);

export default router;
