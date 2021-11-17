import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { setUserInfo } from "../redux/actions/userActions"
import { BoardCell, BoardRow, GameBoard } from "../styles/BoardStyles"
import {
	Body,
	Button,
	Content,
	CreateRoomButton,
	GameLabel,
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
	TurnLabel,
	UserContainer,
	UsersContainer,
	WelcomeLabel,
} from "../styles/Styles"
import toast, { Toaster } from "react-hot-toast"
import uuid from "react-uuid"
import { SocketContext } from "../socket/socket"
interface User {
	userName: string
	userId: string
}
interface Room {
	roomName: string
	users: User[]
}
const Game = React.memo(() => {
	window.addEventListener("beforeunload", () => {
		console.log("chamando cleanup 1 vez")
		socket.emit("cleanUp", socketId)
	})
	const user = useSelector((state: any) => state.user)
	const [isYourTurn, setIsYourTurn] = React.useState(false)
	const [userList, setUserList] = useState<User[]>([])
	const [roomList, setRoomList] = React.useState<Room[]>([])
	const [gameRoom, setGameRoom] = React.useState("")
	const [socketId, setSocketId] = React.useState("")
	const [opponent, setOpponent] = React.useState("")
	const dispatch = useDispatch()
	const socket = React.useContext(SocketContext)
	const notify = (message: string) => toast(message)
	const handleCellClick = (cell: string) => {
		console.log(cell)
		socket.emit("move", { cell: cell, user: user, room: gameRoom })
		setIsYourTurn(false)
	}
	const handleCreateRoom = () => {
		socket.emit(
			"createRoom",
			socketId,
			{ roomName: `Sala de ${user}`, users: [] },
			(response: Room) => joinedRoomCallback(response)
		)
	}
	const handleJoinRoom = (room: Room) => {
		console.log("gameRoom: ", gameRoom)
		if (!gameRoom) {
			socket.emit("joinRoom", socketId, room, (response: Room) =>
				joinedRoomCallback(response)
			)
		} else {
			notify("Você já está em uma sala!")
		}
	}
	const handleLogout = () => {
		socket.emit("cleanUp", socketId)
		dispatch(setUserInfo(null))
		setSocketId("")
		socket.disconnect()
	}
	const handleLeaveRoom = () => {
		socket.emit("leaveRoom", socketId, gameRoom)
		setGameRoom("")
	}

	const joinedRoomCallback = (room: Room) => {
		setGameRoom(room.roomName)
		notify(`Entrou na ${room.roomName}`)
	}
	//function that capitalizes first letter of string

	// useEffect(() => {
	// 	console.log("roomList: ", roomList)
	// 	return () => {}
	// }, [roomList])

	useEffect(() => {
		socket.connect()
		console.log("1 render")
		socket.on("connect", () => {
			notify(`conectado com id: ${socket.id}`)
			console.log(`conectado com id: ${socket.id}`)
		})
		notify(`conectado com id: ${socket.id}`)
		setSocketId(socket.id)
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
		socket.on("testeRes", (res: string) => {
			notify(res)
			console.log("testeRes: ", res)
		})
		socket.on("joinRoomRes", (room: string) => {})
		socket.on("leaveRoomRes", () => {
			notify(`Saiu da sala`)
			setGameRoom("")
		})
		socket.on("moveRes", (data: { cell: string; user: User }) => {
			console.log("moveRes", data)
			if (!data.user.userName === user) {
				setIsYourTurn(true)
			} else {
				setIsYourTurn(false)
			}
		})

		//socket disconnect listener
		socket.on("disconnect", (reason) => {
			if (gameRoom) socket.emit("leaveRoom", gameRoom)
			dispatch(setUserInfo(null))
			console.log("desconectado")
			socket.disconnect()
		})
		return () => {
			// socket.emit("cleanUp")
			// socket.disconnect()
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
					<Label>Salas:</Label>
					<RoomListContainer>
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
					{opponent && (
						<>
							<GameLabel>Jogando contra: {opponent} </GameLabel>
							{isYourTurn && <TurnLabel>Seu turno!</TurnLabel>}
							{!isYourTurn && (
								<TurnLabel>
									{opponent} está fazendo sua jogada...
								</TurnLabel>
							)}
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
						</>
					)}
					{!opponent && (
						<>
							<GameLabel>
								Crie ou Selecione uma sala para jogar!
							</GameLabel>
						</>
					)}
					{gameRoom && (
						<CreateRoomButton onClick={handleLeaveRoom}>
							Sair da {gameRoom}
						</CreateRoomButton>
					)}
					{!gameRoom && (
						<CreateRoomButton onClick={handleCreateRoom}>
							Criar nova sala
						</CreateRoomButton>
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
