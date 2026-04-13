# The Course Management Portal

The Course Management Portal is a full-stack educational web platform built with **React, Node.js, Express, and MongoDB**.  
It provides students with study materials, notes, guides, and online exams.

---

## 🚀 Features
- Student registration and login system
- Secure authentication with JWT and protected routes
- Course management (add, update, delete, view)
- Admin dashboard for managing students and courses
- Responsive frontend built with React + React Router
- RESTful backend API using Node.js + Express
- MongoDB Atlas integration for database management

---

## 🌐 Live Demo Link
- **Frontend (React - Vercel)**: [https://thedepartmentcoursemanagmentportal-tamijs-projects.vercel.app/](https://thedepartmentcoursemanagmentportal-tamijs-projects.vercel.app/pp)


---

## 📡 API Documentation

### 🔑 Authentication
- **POST /api/register**  
  Request Body:
  ```json
  {
    "name": "Tamij",
    "email": "tamij@example.com",
    "password": "123456"
  }
- POST /api/login
Request Body:
{
  "email": "tamij@example.com",
  "password": "123456"
}


- Response:
{
  "token": "jwt_token_here"
}



### 📚 Courses
- GET /api/courses
Response:
[
  { "id": 1, "title": "Math Basics", "teacher": "Mr. Rahman" },
  { "id": 2, "title": "Physics Advanced", "teacher": "Ms. Akter" }
]
### POST /api/courses
Request Body:
{
  "title": "Chemistry Fundamentals",
  "teacher": "Dr. Karim"
}
- Response:
{
  "message": "Course added successfully"
}
- DELETE /api/courses/:id
Response:
{
  "message": "Course deleted successfully"
}



### Database schema
Student
{
  "name": "string",
  "email": "string",
  "password": "string (hashed)",
  "courses": ["courseId"]
}


Course
{
  "title": "string",
  "teacher": "string",
  "students": ["studentId"]
}


Admin
{
  "username": "string",
  "password": "string (hashed)"
}



 ### 📂 Project structure
The Course Management portal/
├── frontend/   # React frontend
├── backend/    # Node.js + Express backend
├── models/     # MongoDB schemas
├── routes/     # API routes
└── README.md



🧪 Testing tips
- Use Postman or fetch from the frontend to hit:
- POST https://alfa-coaching-portal-1.onrender.com/api/register
- POST https://alfa-coaching-portal-1.onrender.com/api/login
- GET  https://alfa-coaching-portal-1.onrender.com/api/courses

📜 License
This project is licensed under the MIT License.


