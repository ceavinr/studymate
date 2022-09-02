// Express
const express = require("express");
const app = express();
const port = process.env.PORT;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

// cors
var cors = require("cors");
app.use(cors());

// body parserd
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://sparta:hmB2Z8oFEDJWcaqa@cluster0.pajthdd.mongodb.net/?retryWrites=true&w=majority"
  );
}

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://studymate.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-message", (message, room, sender) => {
    const time = new Date().toString();
    axios
      .post("https://api-studymate.herokuapp.com/api/create-pesan", {
        pesan: message,
        sender: sender,
        roomId: room,
        date: time.substring(4, 24),
      })
      .then((res) => {
        io.to(room).emit("receive-message", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

// public file
// const path = require('path')
// app.use('/uploads' ,express.static(path.join(__dirname, 'uploads')))

// start
const routes = require("./src/Routes");
const { default: axios } = require("axios");
app.use("/api", routes);

server.listen(3001, () => {
  console.log("server is running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
