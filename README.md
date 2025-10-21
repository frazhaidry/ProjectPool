
# 🌊 ProjectPool

ProjectPool is a platform built to simplify and streamline the final-year project selection process for students and faculty.

Every student knows the struggle:

❌ Multiple teams fighting for the same project

❌ Endless manual approvals

❌ Zero clarity on who gets what

❌ Confusion and wasted time

ProjectPool eliminates all that by introducing a fair, transparent, and efficient system that ensures every project gets assigned without conflict or chaos.

---

## 📌 Features
- 🔐 **Authentication & Authorization** (Basic auth, user & admin check)  
- 📝 **Project Submission** (students can submit project details)  
- ✅ **Form Validation** (ensures clean data handling)  
- 📊 **Project Listing & Management**  
- 🗄 **MongoDB Integration** for database storage  
- ⚡ Built with **Node.js + Express.js**  

---

## 🛠 Tech Stack
**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication  

**Tools & Utilities:**
- Nodemon
- dotenv
- Git & GitHub  

---

## 📂 Project Structure
```
ProjectPool/
├── controllers/        # Request handlers (e.g., submissionController.js)
├── models/             # Mongoose models (e.g., Submission.js, User.js)
├── routes/             # API routes
├── utils/              # Helper functions (e.g., projectList.js)
├── config/             # DB and environment configuration
├── server.js           # Entry point
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/frazhaidry/ProjectPool.git
cd ProjectPool
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root and add:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server
```bash
npm run dev
```

The server will start on:
```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔑 Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user  

### 📘 Projects
- `POST /api/submissions` → Create a new project submission  
- `GET /api/projects` → Fetch all projects  

---

## 🤝 Contributing
1. Fork this repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  

---

## 📄 License
This project is licensed under the MIT License.  
Feel free to use, modify, and distribute.  

---

## 👨‍💻 Author
**Fraz Haidry**  
🔗 [GitHub](https://github.com/frazhaidry)  

---

✨ *ProjectPool is built to simplify project management and submissions for students & developers.*
