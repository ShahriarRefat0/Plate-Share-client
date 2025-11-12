# 🍽️ PlateShare — Community Food Sharing Platform  

### 🌐 Live Website  
🔗 [Visit PlateShare Live Site](#)  
🔗 [Server API (Vercel)](#)  

---

## 📖 Project Overview  

**PlateShare** is a full-stack MERN application that connects communities through food sharing. It allows users to donate surplus food and helps others find and request meals — reducing food waste while supporting those in need.  

This platform promotes sustainability, generosity, and a sense of community.  

---

## Key Features  

- **Food Request System:** Registered users can request food, and donors can accept or reject requests.  
- **Food Sharing System:** Users can donate food with full details including quantity, location, and expiry date.  
- **Firebase Authentication:** Email-password and Google login system with secure route protection.  
- **Private Dashboard:** Manage, update, or delete donated food items from your account.  
- **Interactive Alerts:** SweetAlert2 and React Hot Toast for success/error messages.  
- **Smooth Animations:** Implemented AOS animations for a modern interface.  
- **Fully Responsive:** Optimized layout for mobile, tablet, and desktop devices.  

---

## 🧑‍💻 Technologies Used  

### **Frontend**
- React.js (Vite)
- React Router DOM
- Tailwind CSS + DaisyUI
- Firebase Authentication
- Context API
- SweetAlert2 (draggable alerts)
- React Hot Toast
- AOS (Animate on Scroll)
- Framer Motion 

### **Backend**
- Node.js + Express.js
- MongoDB Atlas
- Firebase Admin SDK
- dotenv, cors

---

## 🗂️ Project Structure  
  
src/  
│  
├── assets/ # Images, logos, icons  
├── components/ # Reusable UI components  
├── layouts/ # MainLayouts (Navbar, Footer, Outlet)  
├── pages/ # Page components  
│ ├── Home.jsx  
│ ├── AvailableFoods.jsx  
│ ├── AddFood.jsx  
│ ├── ManageMyFoods.jsx  
│ ├── MyFoodRequests.jsx  
│ ├── FoodDetails.jsx  
│ └── ErrorPage.jsx  
│  
├── routes/ # Route configuration  
├── authProvider/ # Firebase Auth context  
└── main.jsx # App entry point  

---


---

## ⚙️ Core Functionalities  

### 🥣 Add Food  
Users can add new food items (image hosted via imgbb) including details like:
- Food name, quantity, pickup location, expire date, notes  
- Auto-filled donator info (from logged-in Firebase user)  

### 🍛 Manage My Foods  
Users can:
- **Update** existing foods  
- **Delete** foods (SweetAlert2 confirmation)  

### 🍽️ Available Foods  
Public route that lists all available foods with:
- Image, donor info, quantity, location, expiry date  
- “View Details” button (private route access)  

### 📩 Food Request System  
- Any logged-in user can request food with a note, contact, and location.  
- Donors can **Accept** or **Reject** requests.  
- Request status updates dynamically in MongoDB.  

### 🔑 Authentication  
- Firebase email/password + Google login  
- Keeps users logged in after reload  
- Redirects back to the intended route after login  

### ❌ Error Handling  
- Custom 404 page with animation and “Go Back Home” button  
- SweetAlert2 for all success/error messages  

---

## 🏆 Developer

**👤 Shahariar Refat**  
📧 [shahariarrefat@gmail.com](mailto:shahariarrefat@gmail.com)  
🌐 [GitHub Profile](https://github.com/ShahriarRefat0)


