const User = require("../models/User")

// POST answer for a specific screen
const updateScreen = async (req, res) => {
  const screenNumber = parseInt(req.params.screen) // from URL like /screen1
  const screenKey = `screen${screenNumber}`
  const { answer } = req.body || {}
  if (!answer) {
    return res
      .status(400)
      .json({ error: "Answer is required in the request body." })
  }

  try {
    const user = await User.findById(req.user)
    if (!user) return res.status(404).json({ msg: "User not found" })

    // Use Map.set() for onboarding answers
    user.onboarding.set(screenKey, answer)

    // Update completedScreens if not already present
    if (!user.completedScreens.includes(screenNumber)) {
      user.completedScreens.push(screenNumber)
    }

    await user.save()
    res.status(200).json({ msg: `Answer saved for ${screenKey}` })
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

// GET answer for a specific screen
const getScreenAnswer = async (req, res) => {
  const screenNumber = parseInt(req.params.screen)
  const screenKey = `screen${screenNumber}`

  try {
    const user = await User.findById(req.user)
    if (!user) return res.status(404).json({ msg: "User not found" })

    const answer = user.onboarding.get(screenKey)
    if (!answer)
      return res.status(404).json({ msg: `No answer found for ${screenKey}` })

    res.status(200).json({ screen: screenKey, answer })
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

// GET answers for all the screens
const getAllAnswers = async (req, res) => {
  try {
    const user = await User.findById(req.user)
    if (!user) return res.status(404).json({ msg: "User not found" })

    // Convert Map to plain object for JSON response
    const onboardingAnswers = Object.fromEntries(user.onboarding)

    res.status(200).json({ onboarding: onboardingAnswers })
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

// GET drop off stats
const getDropoffStats = async (req, res) => {
  try {
    const users = await User.find({}, "completedScreens")

    const screenCount = {} // { 1: 12, 2: 10, ... }

    users.forEach((user) => {
      user.completedScreens.forEach((screenNum) => {
        screenCount[screenNum] = (screenCount[screenNum] || 0) + 1
      })
    })

    // Convert to ordered screen keys
    const sortedStats = Object.keys(screenCount)
      .sort((a, b) => Number(a) - Number(b))
      .reduce((acc, key) => {
        acc[`screen${key}`] = screenCount[key]
        return acc
      }, {})

    res.json(sortedStats)
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

module.exports = {
  updateScreen,
  getScreenAnswer,
  getAllAnswers,
  getDropoffStats,
}
