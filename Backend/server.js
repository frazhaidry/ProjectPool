const dotenv = require("dotenv");
const connectDB = require("./cofig/db"); // <-- typo? should be ./config/db
const express = require("express");

const authRouter = require("./routes/auth");
const submissionRouter = require("./routes/SubmissionRoute");
const cookieParser = require("cookie-parser");
const app = express();


app.use(cookieParser());


dotenv.config();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/submissions", submissionRouter);

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
