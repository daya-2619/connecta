
# 🚀 Connecta

A real-time, email-based chat application built with React, Vite, Node.js, Express, MongoDB, and Socket.io.  
Chat, share images, and connect instantly — all with a modern UI! ✉️💬

---

## ✨ Features

- ⚡ Real-time messaging with WebSockets (Socket.io)
- 📧 Email-based authentication & user profiles
- 🖼️ Image and text message support
- 📱 Responsive UI (sidebar, chat, media gallery)
- 🟢 User presence (online/offline indicators)
- 👤 Profile picture uploads (Cloudinary)
- 💾 Persistent chat history (MongoDB)

---

## 🗂️ Project Structure

```
/
├── App.jsx                 # Main React app component for routing/pages
├── main.jsx                # React entry point, sets up providers and router
├── server.js               # Express server, API, Socket.io
├── components/             # Chat UI components (Sidebar, ChatContainer, RightSidebar)
├── assets/                 # Images, icons, dummy data
├── context/                # Auth and Chat React context providers
├── controllers/            # Express route logic for users/messages
├── middleware/             # Express auth middleware
├── models/                 # Mongoose schemas (User, Message)
├── routes/                 # Express route definitions (auth, messages)
├── lib/                    # DB connection, cloudinary, utils
├── pages/                  # Page-level React components (Login, Home, Profile)
├── public/                 # Static files
├── index.html              # App HTML entry point
├── package.json            # Project dependencies/config
├── vite.config.js          # Vite + TailwindCSS config
└── eslint.config.js        # ESLint rules
```

---

## 🚦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daya-2619/connecta.git
   cd connecta
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file for both frontend and backend.
   - Set:
     ```
     VITE_BACKEND_URL=http://localhost:5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. **Run the backend server:**
   ```bash
   npm run server
   ```
   (or `node server.js` if not set up in scripts)

5. **Run the frontend:**
   ```bash
   npm run dev
   ```

6. **View the app:**  
   🌐 Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Tech Stack

- **Frontend:** React ⚛️, Vite ⚡, TailwindCSS 💨, React Router, Context API
- **Backend:** Node.js 🟩, Express 🚂, MongoDB 🍃, Socket.io 🔌
- **Media:** Cloudinary ☁️
- **Auth:** JWT 🔑, Bcrypt 🔒

---

## 🧩 Main Components

- **App.jsx:** Routing and auth context
- **Sidebar, RightSidebar, ChatContainer:** Core UI
- **Context:** Auth & Chat global state
- **Controllers/Models:** Business logic (login, signup, chat, messages)
- **Routes:** REST API & Socket.io events

---

## 🤝 Contribution

Found a bug? Have an idea?  
Open an issue or submit a pull request! 🚀

---

Made by [daya-2619](https://github.com/daya-2619)

---

