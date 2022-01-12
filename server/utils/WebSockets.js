class WebSockets {
  #users;

  constructor() {
    this.users = [];
  }

  connection(socket) {

    // event fired when the chat room is disconnected
    socket.on('disconnect', () => {
      this.users = this.users.filter((user) => user.socketId !== socket.id);
    });
    // add identity of user mapped to the socket id
    socket.on('identity', (userId) => {
      this.users.push({
        socketId: socket.id,
        userId,
      });
      socket.emit('sendUsers', this.users);
    });
    // subscribe person to chat & other user as well
    socket.on('subscribe', (room, otherUserId = '') => {
      this.subscribeOtherUser(room, otherUserId);
      socket.join(room);
    });
    // mute a chat room
    socket.on('unsubscribe', (room) => {
      socket.leave(room);
    });

  }

  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter((user) => user.userId === otherUserId);
    userSockets.map((userInfo) => {
      const sockets = global.io.sockets.sockets;
      for(const [socketId, tempSocket] of sockets.entries()) {
        if(socketId === userInfo.socketId) {
          tempSocket.join(room);
        }
      }
    });
  }

}

export default new WebSockets();
