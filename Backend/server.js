const dotenv = require("dotenv");
const connectDB = require("./cofig/db"); // <-- typo? should be ./config/db
const express = require("express");

const authRouter = require("./routes/auth");
const submissionRouter = require("./routes/SubmissionRoute");
const projectRoutes = require("./routes/ProjectRotes");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");


app.use(cookieParser());


dotenv.config();



// Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests. Please wait before trying again.',
      status: 429
    });
  }
});
app.use(limiter);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/projects/", submissionRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

async function startServer() {
  try {
    await connectDB();
    console.log("✅ Database connection established...");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed", err);
  }
}

startServer();
