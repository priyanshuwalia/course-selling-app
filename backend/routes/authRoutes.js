const express = require("express");
const { signUp,  sigIn, updateUser, seeProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/signup", signUp)
router.post("/signin", sigIn);
router.get("/profile", authMiddleware ,seeProfile)
router.post("/update-profile", updateUser);


module.exports = router;