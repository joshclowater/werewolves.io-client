import io from 'socket.io-client';
import wildcard from 'socketio-wildcard';

import store from 'redux/store';

export let socket;

export const initSocket = type => {
  if (socket === undefined) {
    const options = { query: { type, id: Math.random() } };
    socket = io(
      process.env.NODE_ENV === 'development'
        ? // You can replace "localhost" with IP address for local multi device development
          'http://localhost:3000'
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
    // TODO pass in gameId for on reconnect
    // socket.on('disconnect', () => console.log('~~~!!!~~~', socket.io.opts.query.foo = 'josh was here'));
    // // For local testing only:
    // window.joshTest = socket;
  } else if (!module.hot) {
    throw new Error('Socket is already defined', socket);
  }
};
