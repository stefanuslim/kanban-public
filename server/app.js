require("dotenv").config()
const express = require("express")
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port =  process.env.PORT || 3000
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)



app.use(errorHandler)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("newAddTask",(data)=> io.emit("newAddTask",data))
});


http.listen(port,()=>{
  console.log(`Listening to http://localhost:${port}`)
})
