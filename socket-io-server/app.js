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

// rooms= [
// 	{
// 		roomName: string,
// 		users: ['socket.id1', 'socket.id2']
// 	}
//		 ]
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
		console.log("mandando infos: ", users, rooms)
	})
	// criar sala
	socket.on("createRoom", (roomData) => {
		console.log("create room chamado")
		if (!rooms.find((room) => room.roomName === roomData.roomName)) {
			rooms.push({
				roomName: roomData.roomName,
				users: [...roomData.users, socket.id],
			})
			socket.join(roomData.roomName)
			socket.emit("joinRoomRes", roomData.roomName)
			io.emit("roomsUpdate", rooms)
		}
	})

	// entrar na sala
	socket.on("joinRoom", (roomData) => {
		//join room, adding user to room

		console.log("join room chamado")
		if (rooms.find((room) => room.roomName === roomData.roomName)) {
			rooms
				.find((room) => room.roomName === roomData.roomName)
				.users.push(socket.id)
			socket.join(roomData.roomName)
			socket.emit("joinRoomRes", roomData.roomName) //=> não está funcionando
			io.emit("roomsUpdate", rooms)
		}
		console.log("new rooms (after joinRoom)", rooms)
	})

	// console.log("join room chamado")
	// if (rooms.includes(roomName)) {
	// 	socket.join(roomName)
	// 	socket.emit("joinRoomRes", roomName)
	// }

	// sair da sala
	socket.on("leaveRoom", (roomName) => {
		if (rooms.includes(roomName)) {
			socket.leave(roomName)
			socket.emit("leaveRoomRes", "Left room")
			//delete this room
			rooms = rooms.filter((room) => room !== roomName)
			io.emit("roomsUpdate", rooms)
		}
	})
	//
	// fazer jogada (manda jogada para sala informada no data)
	socket.on("move", (data) => {
		io.broadcast.to(data.room).emit("moveRes", {
			message: `usuário ${socket.id} moveu ${data.cell}`,
		})
	})
	socket.on("disconnect", () => {
		users = users.filter((user) => user.userId !== socket.id)
		//checa se o user está em alguma sala
		rooms.forEach((room) => {
			if (room.users.includes(socket.id)) {
				room.users = room.users.filter((user) => user !== socket.id)
				//se não tiver ninguém mais na sala, deleta
				if (room.users.length === 0) {
					rooms = rooms.filter((room) => room !== room.roomName)
				}
				io.emit("roomsUpdate", rooms)
			}
		})
	})
})

// io disconnect event listener
io.on("disconnect", (socket) => {
	console.log("disconnect")
	users = users.filter((user) => user.userId !== socket.id)
	//checa se o user está em alguma sala
	rooms.forEach((room) => {
		if (room.users.includes(socket.id)) {
			room.users = room.users.filter((user) => user !== socket.id)
			//se não tiver ninguém mais na sala, deleta
			if (room.users.length === 0) {
				rooms = rooms.filter((room) => room !== room.roomName)
			}
			io.emit("roomsUpdate", rooms)
		}
	})
})

// })

// socket.on("chat", (data) => {
// 	io.sockets.emit("chat", data)
// })

// io that disconnects
// socket.on("disconnect", () => {
// 	console.log("user disconnected")
// })
//delete room when empty
// if (rooms.length > 0) {
// 	rooms.forEach((room) => {
// 		if (io.sockets.adapter.rooms[room].length === 0) {
// 			rooms = rooms.filter((room) => room !== room)
// 		}
// 	})
// }
// remove user from users array when disconnected

//create rooms for each pair of users

// instrument(io, {
// 	auth: false,
// })
