import React, { useEffect, useMemo, useState } from "react"
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
	MiddleBar,
	OnlineFlag,
	RoomListContainer,
	SideBar,
	UserContainer,
	UsersContainer,
	WelcomeLabel,
} from "../styles/Styles"
import toast, { Toaster } from "react-hot-toast"
interface User {
	userName: string
	userId: string
}
const Game = React.memo(() => {
	const user = useSelector((state: any) => state.user)
	const [isYourTurn, setIsYourTurn] = React.useState(false)
	const [userList, setUserList] = useState<User[]>([])
	const [roomList, setRoomList] = React.useState<string[]>([])
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
		!gameRoom && socket.emit("createRoom", `Sala de ${user}`)
	}
	const handleJoinRoom = (room: string) => {
		!gameRoom && socket.emit("joinRoom", room)
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
		socket.on("getInfoOnConnectRes", (rooms: string[]) => {
			console.log("inicializando array de salas")
			setRoomList(rooms)
		})
		socket.on("usersUpdate", (users: User[]) => {
			setUserList(users)
		})
		socket.on("roomsUpdate", (rooms: string[]) => {
			notify(`Uma sala foi criada!`)
			setRoomList(rooms)
		})
		socket.on("joinRoomRes", (room: string) => {
			console.log("joinRoomRes", room)
			setGameRoom(room)
		})

		//socket disconnect listener
		socket.on("disconnect", (reason) => {
			if (reason === "io server disconnect") {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect()
			} else {
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
						<p>Usuários conectados:</p>
						<UsersContainer>
							{userList.map((user: User) => (
								<UserContainer>
									<OnlineFlag>•</OnlineFlag>
									{user.userName}
								</UserContainer>
							))}
						</UsersContainer>
					</InfoContainer>
					<RoomListContainer>
						<p>Salas:</p>
						{roomList.length > 0 ? (
							roomList.map((room) => (
								<Button
									onClick={() => handleJoinRoom(room)}
									// key={Math.random() + Math.random()}
								>
									{room}
								</Button>
							))
						) : (
							<p>Nenhuma sala ainda!</p>
						)}
						{!gameRoom && (
							<Button onClick={handleCreateRoom}>
								Criar nova sala
							</Button>
						)}
						{gameRoom && (
							<Button onClick={handleLeaveRoom}>
								Sair da {gameRoom}
							</Button>
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
				</MiddleBar>
				<SideBar>
					<Button onClick={handleLogout}> Sair </Button>
				</SideBar>
			</Content>
		</Body>
	)
})
export default Game
