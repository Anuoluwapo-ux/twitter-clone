import express from "express"
import { protectRoutes } from "../middleware/protectRoutes.js";
import { followUnfollowUser, getUserProfile, getSuggestedUsers, updateUser} from "../controllers/userController.js";

const router = express.Router();
router.get("/profile/:username",protectRoutes,getUserProfile)
router.get("/suggested",protectRoutes,getSuggestedUsers)
router.post("/follow/:id",protectRoutes,followUnfollowUser)
router.post("/update",protectRoutes,updateUser)

export default router;