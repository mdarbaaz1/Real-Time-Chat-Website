const socket = io('http://localhost:8000');

const form = document.getElementById('form');
const text = document.getElementById('text');
const container = document.querySelector(".container");

var audio = new Audio('ting.mp3');

const append= (message,position)=>{
  const messageelement = document.createElement('div');
  messageelement.innerText= message;
  messageelement.classList.add('message');
  messageelement.classList.add(position);
  container.append(messageelement);
  if(position=='left')
  {
      audio.play();
  }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = text.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    text.value='';
})

const names = prompt("Enter your Name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right');
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('leave', name=>{
    append(`${name} left the chat`,'right');
})