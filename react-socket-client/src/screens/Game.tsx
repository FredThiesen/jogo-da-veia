import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { setUserInfo } from "../redux/actions/userActions"
import { BoardCell, BoardRow, GameBoard } from "../styles/BoardStyles"
import {
	Body,
	Button,
	Content,
	Header,
	InfoContainer,
	JoinRoomButton,
	Label,
	MiddleBar,
	OnlineFlag,
	RoomContainer,
	RoomListContainer,
	RoomUsersLabel,
	SideBar,
	UserContainer,
	UsersContainer,
	WelcomeLabel,
} from "../styles/Styles"
import toast, { Toaster } from "react-hot-toast"
import uuid from "react-uuid"
interface User {
	userName: string
	userId: string
}
interface Room {
	roomName: string
	users: User[]
}
const Game = React.memo(() => {
	const user = useSelector((state: any) => state.user)
	const [isYourTurn, setIsYourTurn] = React.useState(false)
	const [userList, setUserList] = useState<User[]>([])
	const [roomList, setRoomList] = React.useState<Room[]>([])
	const [gameRoom, setGameRoom] = React.useState("")
	const dispatch = useDispatch()
	const socket = io("http://127.0.0.1:3000")
	const notify = (message: string) => toast(message)

	const handleCellClick = (cell: string) => {
		console.log(cell)
		socket.emit("move", { cell: cell, user: user, room: gameRoom })
		setIsYourTurn(false)
	}
	const handleCreateRoom = () => {
		socket.emit("createRoom", { roomName: `Sala de ${user}`, users: [] })
	}
	const handleJoinRoom = (room: Room) => {
		console.log("gameRoom: ", gameRoom)
		if (!gameRoom) {
			socket.emit("joinRoom", room)
		}
	}
	const handleLogout = () => {
		socket.disconnect()
		dispatch(setUserInfo(null))
	}
	const handleLeaveRoom = () => {
		socket.emit("leaveRoom", gameRoom)
		setGameRoom("")
	}
	//function that capitalizes first letter of string

	// useEffect(() => {
	// 	console.log("roomList: ", roomList)
	// 	return () => {}
	// }, [roomList])

	useEffect(() => {
		console.log("1 render")
		socket.on("connect", () => {
			notify(`conectado com id: ${socket.id}`)
		})
		socket.emit("registerUser", { userName: user, userId: socket.id })
		//connect user to room
		socket.emit("getInfoOnConnect")
		socket.on("getInfoOnConnectRes", (data: { rooms: []; users: [] }) => {
			console.log("inicializando array de salas")
			setRoomList(data.rooms)
			setUserList(data.users)
		})
		socket.on("usersUpdate", (users: User[]) => {
			setUserList(users)
		})
		socket.on("roomsUpdate", (rooms: Room[]) => {
			setRoomList(rooms)
		})
		socket.on("joinRoomRes", (room: string) => {
			console.log("joinRoomRes", room)
			notify(`Entrou na ${room}`)
			setGameRoom(room)
		})

		//socket disconnect listener
		socket.on("disconnect", (reason) => {
			if (reason === "io server disconnect") {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect()
			} else {
				if (gameRoom) socket.emit("leaveRoom", gameRoom)
				dispatch(setUserInfo(null))
				console.log("desconectado")
				socket.disconnect()
			}
		})
		return () => {
			socket.disconnect()
		}
	}, [])
	return (
		<Body>
			<Toaster />
			<Header />
			<Content>
				<SideBar>
					<InfoContainer>
						<WelcomeLabel>
							Bem vindo, {user}!{/* tic tac toe board */}
						</WelcomeLabel>
						<Label>Usuários conectados:</Label>
						<UsersContainer>
							{userList.map((user: User) => (
								<UserContainer key={uuid()}>
									<OnlineFlag>•</OnlineFlag>
									{user.userName}
								</UserContainer>
							))}
						</UsersContainer>
					</InfoContainer>
					<RoomListContainer>
						<Label>Salas:</Label>
						{roomList.length > 0 ? (
							roomList.map((room) => (
								<RoomContainer
									key={uuid()}
									// key={Math.random() + Math.random()}
								>
									{room.roomName}
									<RoomUsersLabel>
										{room.users.length} / 2
									</RoomUsersLabel>

									{room.users.length < 2 ? (
										<JoinRoomButton
											onClick={() => handleJoinRoom(room)}
										>
											<RoomUsersLabel>
												Entrar
											</RoomUsersLabel>
										</JoinRoomButton>
									) : (
										<RoomUsersLabel>
											Sala cheia!
										</RoomUsersLabel>
									)}
								</RoomContainer>
							))
						) : (
							<p>Nenhuma sala ainda!</p>
						)}
					</RoomListContainer>
				</SideBar>
				<MiddleBar>
					<GameBoard>
						<BoardRow>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("11")
										: null
								}
							></BoardCell>
							<BoardCell
								props={"O"}
								onClick={
									isYourTurn
										? () => handleCellClick("12")
										: null
								}
							></BoardCell>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("13")
										: null
								}
							></BoardCell>
						</BoardRow>
						<BoardRow>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("21")
										: null
								}
							></BoardCell>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("22")
										: null
								}
							></BoardCell>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("23")
										: null
								}
							></BoardCell>
						</BoardRow>
						<BoardRow>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("31")
										: null
								}
							></BoardCell>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("32")
										: null
								}
							></BoardCell>
							<BoardCell
								props={"X"}
								onClick={
									isYourTurn
										? () => handleCellClick("33")
										: null
								}
							></BoardCell>
						</BoardRow>
					</GameBoard>
					{gameRoom && (
						<Button onClick={handleLeaveRoom}>
							Sair da {gameRoom}
						</Button>
					)}
					{!gameRoom && (
						<Button onClick={handleCreateRoom}>
							Criar nova sala
						</Button>
					)}
				</MiddleBar>
				<SideBar>
					<Button onClick={handleLogout}> Sair </Button>
				</SideBar>
			</Content>
		</Body>
	)
})
export default Game
