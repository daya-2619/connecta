import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io"; // <-- Correct import
import path from "path";

const app = express();
const server = http.createServer(app); // <-- Only one 'server'

export const io = new Server(server, {
    cors: { origin: "*" }
});

export const userSocketMap ={};

io.on("connection",()=>{
    const userId = Socket.handshake.query.userId;
    console.log("User Connected",userId);

    if(userId) userSocketMap[userId]=Socket.id;

    io.emit("getOnlineUser",Object.keys(userSocketMap));

    Socket.on("disconnect",()=>{
        console.log("User Disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlinreUser",Object.keys(userSocketMap))
    })
})

app.use(cors());
app.use(express.json({limit:"4mb"}));
app.use("/api/messages",messageRouter)

app.use('/favicon.ico', express.static(path.join(process.cwd(), 'favicon.ico')));

// Route setup for chat application 

app.use("/api/status", (req, res) =>  res.send("Server is running"));
app.use("/api/auth",userRouter);

await connectDB();

if(process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server is running on port :`+PORT));

}
// Export the server for use in other modules
export default server;
