// const { Socket } = require('socket.io');

// const { Socket } = require('socket.io');

const io = require('socket.io')(8000, {
  cors: {
    origin: '*',
  }
});
const users={};

io.on('connect',socket =>{

  socket.on('new-user-joined',name =>{
      console.log("user",name);
      users[socket.id]=name;
      socket.broadcast.emit('user-joined',name);
  });

  socket.on('send',message =>{
      socket.broadcast.emit('recieve',{message: message,name: users[socket.id]});
  });

  socket.on('disconnet',name  =>{
      socket.broadcast.emit('leave',users[socket.id]);
      delete users[socket.id];
  });
});

