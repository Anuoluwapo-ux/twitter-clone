import express from "express";
import { protectRoutes } from "../middleware/protectRoutes.js";
import { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getlikedPosts, getFollowingPosts, getUserPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/all", protectRoutes, getAllPosts);
router.get("/following", protectRoutes, getFollowingPosts);
router.get("/likes/:id", protectRoutes, getlikedPosts);
router.get("/user/:username", protectRoutes, getUserPosts);
router.post("/create", protectRoutes, createPost);
router.post("/like/:id", protectRoutes, likeUnlikePost);
router.post("/comment/:id", protectRoutes, commentOnPost);
router.delete("/delete/:id", protectRoutes, deletePost);

export default router;