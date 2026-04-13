# 🎓 learnify

> A fully-featured, full-stack **learnify** app where users can register, log in, purchase courses, track progress, and instructors can manage courses and lectures.  
> Built with ❤️ using **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

## 🔗 Live Demo: [https://learnify.vercel.app/](https://learnify.vercel.app/)

## 🎥 Video Demo:[https://youtu.be/D29g4eM6nvM](https://youtu.be/D29g4eM6nvM)

---

## 🚀 Project Overview

This project enables:

- User Authentication (Students & Instructors)
- Course Purchase with **Razorpay Integration**
- Interactive Video Learning (Cloudinary & YouTube Support)
- Instructor Course & Lecture Management
- Real-time Course Progress Tracking
- Course Search & Filter Functionality
- Responsive UI for Desktop & Mobile

- [learnify-VideoDemo.webm](https://github.com/user-attachments/assets/2ffcfeaf-5e6c-49d3-99d3-f13eb036859b)

---

## Features

### 🎯 Student Side:

- Register & Login with **JWT** & **bcrypt**
- Purchase Paid Courses using **Razorpay**
- Update Profile (Name, Bio, Profile Picture)
- View Enrolled Courses & Track Progress
- Interactive Video Playback with progress auto-tracking
- Search and Filter Courses
- Responsive, Clean UI built with **Tailwind CSS**

---

### 👨‍🏫 Instructor Side:

- Create, Edit, Delete Courses & Lectures
- Publish/Unpublish Courses and Lectures
- Upload Media Files using **Cloudinary**
- Manage Students and Course Content

---

### ⚡ Global Features:

- Role-based Access Control
- Secure Cookie-based Authentication
- Secure CORS Configuration
- Error Handling & Loading Indicators
- Responsive UI across devices
- Razorpay Integration for Course Payments

---

## 🧱 Tech Stack

**Frontend:**

- React.js
- Tailwind CSS
- Axios

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- JWT & bcrypt
- Razorpay Payment Gateway
- Cloudinary for Media Uploads

---

## Setup Guides

- Manual dev: copy `server/.env.example` → `server/.env` and `client/.env.example` → `client/.env`, make sure MongoDB is running locally, then run the server and client dev commands separately
- Docker dev: copy `server/.env.docker.example` → `server/.env.docker`, keep `client/.env`, and MongoDB comes from Docker via `docker compose -f infra/docker-compose.yml up --build`
- Manual & Docker setup → [SETUP.md](./SETUP.md)
- Contribution guide → [CONTRIBUTION.md](./CONTRIBUTION.md)

## 🤝 Contributing

Contributions are welcome!  
Fork the repo ➔ Make your improvements ➔ Submit a Pull Request 🚀

---

Please Give a GitHub ⭐️ : [https://github.com/jatingupta1204/learnify](https://github.com/jatingupta1204/learnify)

---
