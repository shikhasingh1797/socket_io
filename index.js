const express = require("express");
const app = express();
const server = require("http").createServer(app);
let mysql = require("mysql");
const io=require("socket.io")(server,{cors:{origin:"*"}});
// app.use(cors());

app.set("view engine","ejs");

app.get("/home",(req,res)=>{
    res.render("home")
});


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port : '3306',
    password: "password",
    database: "realchat"
});
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

server.listen(3001,()=>{
    console.log("Server is running.....3001")
})

io.on("connection", (socket) => {
    console.log("User connected"+socket.id)

    socket.on("message",(data)=>{
        // console.log(data);
        socket.broadcast.emit('message',data)
    })
})  
