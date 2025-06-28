require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const onboardingRoutes = require("./routes/onboarding")

const app = express()
app.use(cors())
app.use(express.json())

const path = require("path")
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/onboarding", onboardingRoutes)

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected")
    app.listen(5000, () => console.log("Server running on port 5000"))
  })
  .catch((err) => console.log(err))
