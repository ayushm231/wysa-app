const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
  updateScreen,
  getScreenAnswer,
  getDropoffStats,
  getAllAnswers,
} = require("../controllers/onboardingController")

router
  .route("/screen:screen")
  .get(authMiddleware, getScreenAnswer)
  .post(authMiddleware, updateScreen)

// GET: all answers of the screens
router.get("/all", authMiddleware, getAllAnswers)

// GET: drop-off stats
router.get("/dropoff-stats", getDropoffStats)

module.exports = router
