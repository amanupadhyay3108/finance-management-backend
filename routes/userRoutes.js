import express from "express";
import {
  register,
  login,
  getUsers,
  toggleUserStatus
} from "../controllers/userController.js";

import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roleCheck.js";

const router = express.Router();

/* ===== AUTHORIZATION ===== */
router.post("/register", register);
router.post("/login", login);
router.patch(
  "/:id/toggle-status",
  auth,
  allowRoles("admin"),
  toggleUserStatus
);

/* ===== ADMIN ONLY ===== */
router.get("/", auth, allowRoles("admin"), getUsers);

export default router;