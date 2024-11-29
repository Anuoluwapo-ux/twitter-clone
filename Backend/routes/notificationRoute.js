import express from "express";
import { protectRoutes } from "../middleware/protectRoutes.js";
import { deleteNotifications, getNotifications, deleteNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protectRoutes, getNotifications);
router.delete("/delete", protectRoutes, deleteNotifications);
router.delete("/delete/:id", protectRoutes, deleteNotification);

export default router;