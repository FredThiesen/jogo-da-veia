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

//
let rooms = []
let users = []
io.on("connection", (socket) => {
	//registrar novo usuário
	socket.on("registerUser", (payload) => {
		users.push({ userName: payload.userName, userId: socket.id })
		console.log("registrando novo usuário: ", payload.userName)
		io.emit("usersUpdate", users)
	})
	// inicializar salas e users
	socket.on("getInfoOnConnect", () => {
		io.emit("getInfoOnConnectRes", { rooms, users })
		console.log("mandando infos: ", users)
	})
	// criar sala
	socket.on("createRoom", (roomName) => {
		if (!rooms.includes(roomName)) {
			rooms.push(roomName)
			socket.join(roomName)
			io.emit("joinRoomRes", roomName)
			io.emit("roomsUpdate", rooms)
		}
	})
	// entrar na sala
	socket.on("joinRoom", (roomName) => {
		if (rooms.includes(roomName)) {
			socket.join(roomName)
			io.emit("joinRoomRes", roomName)
		} else {
			socket.emit("joinRoomRes", {
				success: false,
				message: "Room does not exist",
			})
		}
	})
	// sair da sala
	socket.on("leaveRoom", (roomName) => {
		if (rooms.includes(roomName)) {
			socket.leave(roomName)
			socket.emit("leaveRoomRes", "Left room")
		}
	})
	//
	// fazer jogada (manda jogada para sala informada no data)
	socket.on("move", (data) => {
		io.broadcast
			.to(data.room)
			.emit("moveRes", { message: `usuário ${socket.id}` })
	})
	socket.on("disconnect", () => {
		users = users.filter((user) => user.userId !== socket.id)
		io.emit("usersUpdate", users)
	})
})

// socket.on("chat", (data) => {
// 	io.sockets.emit("chat", data)
// })

// io that disconnects
// socket.on("disconnect", () => {
// 	console.log("user disconnected")
// })

// remove user from users array when disconnected

//create rooms for each pair of users

// instrument(io, {
// 	auth: false,
// })
