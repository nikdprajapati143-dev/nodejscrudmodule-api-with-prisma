// socket.js
import { Server } from "socket.io";
// import prisma from "../utils/prismaClient";

let onlineUsers = [];

export default function socketHandler(httpServer) {
    const io = new Server(httpServer, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("register", (userId) => {
            if (!onlineUsers.some((user) => user.userId === userId)) {
                onlineUsers.push({ userId, socketId: socket.id });
            }
            console.log("Connected users", onlineUsers);
        });

        // Load previous chat history
        socket.on('load_messages', async ({ senderId, receiverId }) => {

            // Fetch receiver info from db
            const receiverInfo = await prisma.user.findUnique({
                where: { id: parseInt(receiverId, 10) },
                select: { id: true, name: true, profileImage: true }
            })

            socket.emit('receiver_info', {
                name: receiverInfo.name,
                profileImage: receiverInfo.profileImage,
                id: receiverInfo.id
            })


            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: parseInt(senderId, 10), receiverId: parseInt(receiverId, 10) },
                        { senderId: parseInt(receiverId, 10), receiverId: parseInt(senderId, 10) }
                    ]
                },
                include: {
                    sender: {
                        select: { id: true, name: true, profileImage: true }
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
            socket.emit('chat_history', messages);
        })

        // Typing indicator
        socket.on("typing", ({ senderId, receiverId }) => {
            const receiver = onlineUsers.find((u) => u.userId === receiverId);
            if (receiver) {
                io.to(receiver.socketId).emit("typing", { senderId });
            }
        });

        socket.on("stop_typing", ({ senderId, receiverId }) => {
            const receiver = onlineUsers.find((u) => u.userId === receiverId);
            if (receiver) {
                io.to(receiver.socketId).emit("stop_typing", { senderId });
            }
        });

        socket.on('private_message', async ({ senderId, receiverId, content }) => {
            // Save message in DB
            const message = await prisma.message.create({
                data: {
                    senderId: parseInt(senderId, 10),
                    receiverId: parseInt(receiverId, 10),
                    content: content
                },
                include: {
                    sender: {
                        select: { id: true, name: true, profileImage: true }
                    }
                }
            });

            // Find receiver
            const msgWithTime = { ...message, createdAt: new Date() };
            const receiver = onlineUsers.find((u) => u.userId === receiverId);

            // Send to receiver if online
            if (receiver) {
                io.to(receiver.socketId).emit('new_message', msgWithTime);
            }

            // Also send back to sender's own chat
            io.to(socket.id).emit('new_message', msgWithTime);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
        });
    });

    return io;
}
