class WebSockets {
  #users;

  constructor() {
    this.users = [];
  }

  connection(socket) {

    socket.on('login_logout', (userId, userLoggedIn, type) => {
      if(type === 'changeLoginStatus') {
        this.users.forEach((user) => {
          if(user.userId === userId) {
            user.userLoggedIn = userLoggedIn;
          }
        });
      }

      if (type === 'addRemoveUser') {
        this.users.push({
          socketId: socket.id,
          userId,
          userLoggedIn
        });
      }

      console.log(this.users);
      global.io.sockets.emit('getUsers', this.users, false);
    });

    socket.on('do_refresh', () => {
      global.io.sockets.emit('getUsers', this.users, true);
    });

    socket.on('deleteUser', (userId) => {
      this.users = this.users.filter((user) => { return user.userId !== userId });
    });
    
    socket.on('subscribe', (room, otherUserId = '') => {
      this.subscribeOtherUser(room, otherUserId);
      socket.join(room);
    });
    
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
