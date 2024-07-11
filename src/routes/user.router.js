import { Router } from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/test").get((req, res) => {
  res.send("test page");
})

router.route("/login").post(loginUser);

//Secure routes
router.route("/logout").post(verifyJWT, logOutUser);

export default router;
