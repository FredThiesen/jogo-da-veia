const http = require("http")
const express = require("express")

const app = express()
const httpServer = http.createServer(app)

// const io = require("socket.io")(process.env.PORT || 3000, {
const io = require("socket.io")(httpServer, {
	cors: {
		origin: [
			"https://jogo-da-veia-client.herokuapp.com",
			"http://127.0.0.1:6969",
		],
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: false,
	},
})

httpServer.listen(process.env.PORT || 3000, () => {
	console.log("Server running")
})
// cors: {
// 	origin: "*",
// 	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// 	preflightContinue: false,
// 	optionsSuccessStatus: 204,

// 	// [
// 	// 	"http://jogo-da-veia-client.herokuapp.com",
// 	// 	"jogo-da-veia-client.herokuapp.com",
// 	// 	"https://jogo-da-veia-client.herokuapp.com",
// 	// 	"http://127.0.0.1:6969",
// 	// ],
// },

// })

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
// 		users: ['user.userId1', 'user.userId2']
// 	}
//		 ]
let rooms = []

// users = [
// 	{
//      userName,
// 		userId: string,
//
// 	}
//       ]
let users = []

// evitar que um socket novo seja criado a cada evento - DONE

const findRoom = (roomName) => {
	return rooms.find((room) => room.roomName === roomName)
}

const findUser = (userId) => {
	return users.find((user) => user.userId === userId)
}
const deleteRoomIfEmpty = (roomName) => {
	const room = findRoom(roomName)
	if (room.users.length === 0) {
		rooms = rooms.filter((room) => room.roomName !== roomName)
	}
}

const isUserInRoom = (userId, roomName) => {
	const room = findRoom(roomName)
	return room.users.includes(userId)
}

const updateRooms = () => {
	io.emit("roomsUpdate", rooms)
}

const updateUsers = () => {
	io.emit("usersUpdate", users)
}

io.on("connection", (socket) => {
	//registrar novo usuário
	socket.on("registerUser", (payload) => {
		// set user

		console.log("registrando novo usuário: ", payload.userName, socket.id)
		users.push({ userName: payload.userName, userId: socket.id })
		updateUsers()
	})

	// inicializar salas e users
	socket.on("getInfoOnConnect", () => {
		io.emit("getInfoOnConnectRes", { rooms, users })
		console.log("mandando infos: ", users, rooms)
	})
	// criar sala
	socket.on("createRoom", (socketId, roomData, cb) => {
		console.log("create room chamado")
		if (!findRoom(roomData.roomName)) {
			rooms.push({
				roomName: roomData.roomName,
				users: [...roomData.users, socketId],
			})
			socket.join(roomData.roomName)
			// io.broadcast.to(user.userId).emit("joinRoomRes", roomData.roomName)
			socket.emit("joinRoomRes", roomData.roomName)
			updateRooms()
		}
		cb({
			roomName: roomData.roomName,
			users: [...roomData.users, socketId],
		})
		console.log("new rooms (after create)", rooms)
	})

	// entrar na sala
	socket.on("joinRoom", (socketId, room, cb) => {
		if (!findRoom(room.roomName)) {
			return
		}
		let roomToJoin = findRoom(room.roomName)
		if (roomToJoin.users.length >= 2) {
			return
		}

		console.log("join room chamado")

		console.log("registrando o socket", socketId, "na sala", room.roomName)
		let opponentId = room.users.find((user) => user.userId !== socketId)
		let opponent = findUser(opponentId)
		let user = findUser(socketId)

		roomToJoin.users.push(socketId)

		let newRoom
		rooms = rooms.map((room) => {
			if (room.roomName === roomToJoin.roomName) {
				newRoom = roomToJoin
				return roomToJoin
			}
			return room
		})
		socket.join(room.roomName)
		// io.to(user.userId).emit("joinRoomRes", roomData.roomName) //=> não está funcionando
		// io.broadcast.to(user.userId).emit("joinRoomRes", roomData.roomName)
		updateRooms()
		cb(room, opponent)

		socket.broadcast
			.to(room.roomName)
			// manda seu próprio user para o outro user da room
			.emit("userJoined", user, newRoom)
		console.log("newRoom mandado no userJoined", newRoom)
		console.log("new rooms (after joinRoom)", rooms)
		//
	})

	// console.log("join room chamado")
	// if (rooms.includes(roomName)) {
	// 	socket.join(roomName)
	// 	socket.emit("joinRoomRes", roomName)
	// }

	// sair da sala
	socket.on("leaveRoom", (socketId, roomName) => {
		if (!findRoom(roomName)) {
			socket.leave(roomName)
			return
		}
		console.log("leave room chamado")
		// remove user from room, delete room if no users

		if (isUserInRoom(socketId, roomName)) {
			const room = findRoom(roomName)
			room.users = room.users.filter((user) => user !== socketId)
			deleteRoomIfEmpty(roomName)
			socket.leave(roomName)

			updateRooms()
			socket.broadcast.to(roomName).emit("userLeft")
		}

		// if (room) {
		// 	const roomIndex = rooms.indexOf(room)
		// 	const userIndex = room.users.indexOf(socketId)
		// 	if (userIndex > -1) {
		// 		room.users.splice(userIndex, 1)
		// 	}
		// 	if (room.users.length === 0) {
		// 		rooms.splice(roomIndex, 1)
		// 	}
		// 	socket.leave(roomName)
		// }
		console.log("socket id at leave room", socket.id)
		console.log("stored socketId at leave room", socketId)
		console.log("new rooms (after leaveRoom)", rooms)
	})
	//
	// fazer jogada (manda jogada para sala informada no data)
	socket.on("cleanUp", (socketId) => {
		// remove user from users and rooms
		console.log("cleanUp chamado")
		const userIndex = users.indexOf(findUser(socketId))
		if (userIndex > -1) {
			users.splice(userIndex, 1)
		}
		const room = rooms.find((room) => room.users.includes(socketId))
		if (room) {
			// delete room if no users

			// remove user from room
			if (findRoom(room.roomName)) {
				room.users = room.users.filter((user) => user !== socketId)
			}

			// rooms.splice(roomIndex, 1)

			socket.leave(room.roomName)
			deleteRoomIfEmpty(room.roomName)
		}

		updateRooms()
		updateUsers()
	})
	socket.on("disconnect", () => {
		users = users.filter((user) => user.userId !== socket.id)
		//checa se o user está em alguma sala
		rooms.forEach((room) => {
			if (room.users.includes(socket.id)) {
				room.users = room.users.filter((user) => user !== socket.id)
				//se não tiver ninguém mais na sala, deleta
				deleteRoomIfEmpty(room.roomName)
				updateRooms()
			}
		})
		updateUsers()
		updateRooms()
	})

	socket.on("move", (data, cb) => {
		console.log("move chamado com data: ", data)
		socket.broadcast.to(data.myGameRoom.roomName).emit("moveRes", {
			room: data.myGameRoom.roomName,
			gameBoard: data.gameBoard,
			winner: data.winner,
			draw: data.draw,
		})
		cb(data.gameBoard, data.winner, data.draw)
	})
	socket.on("gameOver", (socketId, roomName, cb) => {
		console.log("gameOver chamado com room ", roomName)
		// delete room
		let room = findRoom(roomName)

		if (room) {
			rooms = rooms.filter((room) => room.roomName !== roomName)
			socket.leave(roomName)
		}
		updateRooms()

		// if (room) {
		// 	room.users = []
		// 	deleteRoomIfEmpty(roomName)
		// 	socket.leave(roomName)
		// }

		// if (isUserInRoom(socketId, roomName)) {
		// 	const room = findRoom(roomName)
		// 	room.users = room.users.filter((user) => user !== socketId)
		// 	deleteRoomIfEmpty(roomName)
		// 	socket.leave(roomName)
		// 	updateRooms()
		// }
		cb()

		// if (room) {
		// 	const roomIndex = rooms.indexOf(room)
		// 	const userIndex = room.users.indexOf(socketId)
		// 	if (userIndex > -1) {
		// 		room.users.splice(userIndex, 1)
		// 	}
		// 	if (room.users.length === 0) {
		// 		rooms.splice(roomIndex, 1)
		// 	}
		// 	socket.leave(roomName)
		// }
	})
	socket.on("leaveGameRoom", (room) => {
		socket.leave(room)
		updateRooms()
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
			deleteRoomIfEmpty(room.roomName)
			updateRooms()
		}
	})
	updateRooms()
	io.emit("usersUpdate", rooms)
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
