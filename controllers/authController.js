const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signup = async (req, res) => {
  try {
    const { nickname, password } = req.body || {}

    if (!nickname || !password) {
      return res.status(400).json({
        error: "Both 'nickname' and 'password' are required.",
      })
    }

    const existingUser = await User.findOne({ nickname })
    if (existingUser)
      return res.status(400).json({ msg: "Nickname already taken" })

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({ nickname, passwordHash })
    await newUser.save()

    res.status(201).json({ msg: "Signup successful" })
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

const login = async (req, res) => {
  try {
    const { nickname, password } = req.body || {}

    if (!nickname || !password) {
      return res.status(400).json({
        error: "Both 'nickname' and 'password' are required.",
      })
    }

    const user = await User.findOne({ nickname })
    if (!user) return res.status(400).json({ msg: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    res.json({ token, userId: user._id })
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-passwordHash") // exclude passwords
    res.status(200).json({ users })
  } catch (err) {
    res.status(500).json({ msg: "Server error", err })
  }
}

module.exports = { signup, login, getAllUsers }
