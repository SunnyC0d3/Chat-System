# Chat System

The purpose of this application was to learn the MERN Stack. Developing a real time chat application using the power of REACT, Node.js, Express, MongoDB, Socket.io.

## Installation

To install the application, just simply clone it to your desktop or download it.

Then configure the **.env** file in the client and server folder to the following -

### Client

Set your **REACT_APP_SERVER_CONNECTION**, to your server localhost.

```bash
REACT_APP_SERVER_CONNECTION=http://localhost:4000
```

### Server

Set your **PORT**, **DB_Connection** and **SECRET_KEY**.

```bash
PORT=4000
DB_Connection=( I personally used MongoDB Atlas, you can use anything here as long it is MongoDB related )
SECRET_KEY=some-secret-key
```

## Finally!!!

Then just run the docker compose build and up command to create the relevant images and container.

```bash
docker-compose build
docker-compose up
```