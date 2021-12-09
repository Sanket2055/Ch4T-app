const express= require("express");
const socketio=require("socket.io");
const http=require("http");
const PORT= process.env.PORT || 5000;   
const app=express();
const router=require("./router");
const cors = require ('cors')
const {addUser ,removeUser ,getUser,getUsersInRoom } =require('./users')

app.use(cors());
app.use(router);
const server=http.createServer(app);
const io = socketio (server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
})
io.on('connection' , (socket)=>{
    console.log('new connection');

    socket.on('join' , ({name , room}, callback)=>{
        const {error, user} = addUser({id:socket.id  , name , room});
        console.log(error);

        if(error) return (callback(error));
        
        socket.join(user.room);
        socket.emit('message' ,{ user:'admin' , text:`${user.name} welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message' , { user:'admin' , text:`${user.name} has joined`})
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();


    })
 
    socket.on('sendMessage',(message , callback)=>{
        const user=getUser(socket.id);

        io.to(user.room).emit('message' , {user: user.name , text:message});
        io.to(user.room).emit('roomData' , {room: user.room , users: getUsersInRoom(user.room)});
        callback();

    } );
    socket.on('disconnect' , () => {
        const user = removeUser(socket.id)
    
        user &&
          io.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} has left`,
          })
      })


})

server.listen(PORT , ()=>console.log(`the server is running on port ${PORT}`));