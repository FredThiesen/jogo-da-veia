const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://127.0.0.1:3001"],
	},
})

io.on("connection", (socket) => {
	console.log(socket.id)
})

// socket.on("chat", (data) => {
// 	io.sockets.emit("chat", data)
// })

// io that disconnects
io.on("disconnect", () => {
	console.log("disconnected")
})

// io.on("connection", (socket) => {
// 	console.log("connected")
// 	socket.on("chat", (data) => {
// 		io.sockets.emit("chat", data)
// 	})
