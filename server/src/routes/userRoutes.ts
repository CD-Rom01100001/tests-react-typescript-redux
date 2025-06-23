import express from "express";
import { 
  register, 
  login, 
  getUsers, 
  updateUser, 
  deleteUser, 
  updateUserTrainingResults, 
  updateUserExamResults 
} from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.patch("/:id/results/training", updateUserTrainingResults);
router.patch("/:id/results/exam", updateUserExamResults);
router.delete("/:id", deleteUser);

export default router;
