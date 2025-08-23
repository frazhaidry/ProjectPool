const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
     role: {
        type: String,
        enum: ["admin", "student" , "faculty"], // 👈 allowed roles
        default: "student" // 👈 default role if not provided
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;