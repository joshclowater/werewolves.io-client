import io from 'socket.io-client';
import wildcard from 'socketio-wildcard';

import store from 'src/redux/store';

export let socket;

export const initSocket = type => {
  if (socket === undefined) {
    const options = { query: { type, id: Math.random() } };
    // You can replace "localhost" with IP address for local multi device development
    socket = io(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://socket.werewolves.io',
      options
    );
    const patch = wildcard(io.Manager);
    patch(socket);
    socket.on('*', packet => {
      store.dispatch({
        type: packet.data[0],
        ...packet.data[1]
      });
    });
  } else {
    throw new Error('Socket is already defined', socket);
  }
};
