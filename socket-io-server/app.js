const { instrument } = require("@socket.io/admin-ui")

const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://127.0.0.1:6969", "https://admin.socket.io"],
	},
})
//create room adapter
// const adapter = new io.adapter.rooms.Redis({
// 	host: "	redis",
// 	port: 6379,
// 	db: 0,
// 	password: "",
// })

//testar

io.on("connection", (socket) => {
	console.log(socket.id)
	//io that receives cell data from the client
	socket.on("cellClick", (data) => {
		console.log(data)
		io.emit("cellClick", data)
	})
	socket.on("join", (data) => {
		socket.join(data)
		console.log("conectando user à sala: ", data.room)
	})
	//emit all rooms
	socket.on("getRooms", () => {
		io.emit("getRooms", io.sockets.adapter.rooms) // não está retornando as salas
	})
	socket.on("teste", () => {
		io.emit("testeRes", "testado")
	})
})

// socket.on("chat", (data) => {
// 	io.sockets.emit("chat", data)
// })

// io that disconnects
io.on("disconnect", () => {
	console.log("disconnected")
})

//create rooms for each pair of users

// instrument(io, {
// 	auth: false,
// })
