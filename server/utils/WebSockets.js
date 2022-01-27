// Main class for Socket Connection

class WebSockets {
  #users;

  constructor() {
    this.users = [];
  }

  connection(socket) {

    // If user logins, the type that gets passed will execute the following commands which allows user to change their login status or add/remove user
    // which keeps track of users for active communication 
    socket.on('login_logout', (userId, userLoggedIn, uniqueID, type) => {
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
          deviceUniqueId: uniqueID,
          userId,
          userLoggedIn
        });
      }

      global.io.sockets.emit('getUsers', this.users, false);
    });

    // Everytime the user gets added or deleted, a refresh signal is sent for the client to refresh the data
    socket.on('do_refresh', () => {
      global.io.sockets.emit('getUsers', this.users, true);
    });

    // Removes user from the array and updates globally on all sockets
    socket.on('deleteUser', (userId) => {
      this.users = this.users.filter((user) => { return user.userId !== userId });
    });
    
    // Adds one user and the other to create a private communication channel
    socket.on('subscribe', (room, otherUserId = '') => {
      this.subscribeOtherUser(room, otherUserId);
      socket.join(room);
    });
    
    // Removes user from room
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
