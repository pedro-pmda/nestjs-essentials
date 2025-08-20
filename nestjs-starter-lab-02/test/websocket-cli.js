const { io } = require('socket.io-client');

// const URL = process.env.WS_URL || "http://localhost:3000"
// const socket = io(URL, {
//   transports: ["websocket"], // opcional, fuerza WS puro (sigue siendo Socket.IO)
// });

const socket = io('http://localhost:3000', { path: '/socket.io' }); // sin transports

socket.on('connect', () => {
  console.log('✔ conectado', socket.id);

  // PRUEBAS: ajusta payloads a tus DTOs
  socket.emit('createMessage', { text: 'hola desde CLI' }, (ack) => {
    console.log('ack createMessage:', ack);
  });

  socket.emit('findAllMessages', null, (res) => {
    console.log('findAllMessages:', res);
  });

  socket.emit('findOneMessage', 1, (res) => {
    console.log('findOneMessage(1):', res);
  });

  socket.emit('updateMessage', { id: 1, text: 'actualizado' }, (res) => {
    console.log('updateMessage:', res);
  });

  socket.emit('removeMessage', 1, (res) => {
    console.log('removeMessage:', res);
  });

  // cierra después de unos segundos
  setTimeout(() => process.exit(0), 2500);
});

socket.on('connect_error', (err) => {
  console.error('❌ connect_error:', JSON.stringify(err));
});
