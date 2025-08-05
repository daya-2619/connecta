import express from "express";
import messageRouter from "./messageRoutes.js";

import { protectRoute } from "../middleware/auth.js";
import { getUserForSidebar, getMessages, markMessageAsSeen } from "../controllers/messageController.js";


const router = express.Router();
router.get("/users",protectRoute,getUserForSidebar);
router.get("/:id",protectRoute,getMessages);
router.put("/mark/:id",protectRoute,markMessageAsSeen);
router.post("/send/:id",protectRoute)

// Example route
router.get("/", (req, res) => {
  res.send("Message route working!");
});

export default router;