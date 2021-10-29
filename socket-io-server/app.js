const { instrument } = require("@socket.io/admin-ui")

const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://127.0.0.1:6969", "https://admin.socket.io"],
	},
})

io.on("connection", (socket) => {
	console.log(socket.id)
	//io that receives cell data from the client
	socket.on("cellClick", (data) => {
		console.log(data)
		io.emit("cellClick", data)
	})
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

//create socket rooms for each pair of clients
// io.on("connection", (socket) => {
// 	console.log("connected")
// 	socket.on("chat", (data) => {
// 		io.sockets.emit("chat", data)
// 	})
instrument(io, {
	auth: false,
})
