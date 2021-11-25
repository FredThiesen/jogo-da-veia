import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
	LoadingDiv,
	MiddleBar,
	OnlineFlag,
	RoomContainer,
	RoomListContainer,
	RoomUsersLabel,
	Row,
	SideBar,
	TurnLabel,
	UserContainer,
	UsersContainer,
	WelcomeLabel,
} from "../styles/Styles"
import toast, { Toaster } from "react-hot-toast"
import uuid from "react-uuid"
import { SocketContext } from "../socket/socket"
import {
	deleteGame,
	setGameBoard,
	setGameRoom,
} from "../redux/actions/gameActions"
import { Game as GameType } from "../interfaces/gameType"
import { checkWinner } from "../functions/checkWinner"
interface User {
	userName: string
	userId: string
}
interface Room {
	roomName: string
	users: string[]
}
const Game = () => {
	window.addEventListener("beforeunload", () => {
		socket.emit("cleanUp", socketId)
	})
	const user = useSelector((state: any) => state.user)
	const { gameBoard, gameRoom }: GameType = useSelector(
		(state: any) => state.game
	)
	const [isYourTurn, setIsYourTurn] = React.useState(false)
	const [player, setPlayer] = React.useState<string>("")
	const [userList, setUserList] = useState<User[]>([])
	const [roomList, setRoomList] = useState<Room[]>([])
	const [myGameRoom, setMyGameRoom] = useState<string>("")
	const [socketId, setSocketId] = useState("")
	const [opponent, setOpponent] = useState<User | null>(null)
	const dispatch = useDispatch()
	const socket = React.useContext(SocketContext)
	const notify = (message: string) => toast(message)

	// handler da jogada
	const handleCellClick = (cellIndex: number) => {
		if (gameBoard) {
			if (gameBoard[cellIndex] !== 0) return
			const newBoard: number[] = [...gameBoard]
			newBoard[cellIndex] = player === "X" ? 1 : -1
			//checa se o movimento ganhou o jogo
			const winner = checkWinner(newBoard)

			socket.emit(
				"move",
				{
					myGameRoom: gameRoom,
					gameBoard: newBoard,
					winner: winner,
				},
				cellClickCallback
			)
			setIsYourTurn(false)
		}
	}
	const cellClickCallback = (gameBoard: number[], winner: boolean) => {
		dispatch(setGameBoard(gameBoard))
		setIsYourTurn(false)
		if (winner) {
			notify("Você venceu!")
			cleanGameAndLeaveRoom()
		}
	}

	const cleanGameAndLeaveRoom = () => {
		console.log("chamando clean game")
		console.log("gameRoom no clean game ", gameRoom)

		// dispatch(deleteGame())
		gameRoom &&
			socket.emit(
				"gameOver",
				socketId,
				gameRoom.roomName,
				gameOverCallback
			)
	}
	const gameOverCallback = () => {
		console.log("game over callback chamado")
		dispatch(deleteGame())
		setMyGameRoom("")
		setOpponent(null)
		setIsYourTurn(false)
	}

	const findUser = (userId: string) => {
		return userList.find((user) => user.userId === userId)
	}
	const findRoom = (roomName: string) => {
		return roomList.find((room) => room.roomName === roomName)
	}
	const handleCreateRoom = () => {
		if (!findRoom(`Sala de ${user}`)) {
			socket.emit(
				"createRoom",
				socketId,
				{ roomName: `Sala de ${user}`, users: [] },
				(response: Room) => createdRoomCallback(response)
			)
		} else {
			notify("Você já criou uma sala!")
		}
	}
	const createdRoomCallback = (room: Room) => {
		dispatch(setGameRoom(room))
		notify(`Entrou na ${room.roomName}`)
	}
	const handleJoinRoom = (room: Room) => {
		console.log("gameRoom: ", gameRoom)
		if (!gameRoom?.roomName) {
			socket.emit(
				"joinRoom",
				socketId,
				room,
				(room: Room, opponent: User) => {
					console.log("oponente no callback: ", opponent)
					joinedRoomCallback(room, opponent)
				}
			)
		} else {
			notify("Você já está em uma sala!")
		}
	}
	const joinedRoomCallback = (room: Room, opponent: User) => {
		//salva gameroom no redux
		dispatch(
			setGameRoom({
				roomName: room.roomName,
				users: [...room.users, socketId],
			})
		)
		setOpponent(opponent)
		setPlayer("X")
		notify(`Entrou na ${room.roomName}`)
		notify(`oponente: ` + opponent.userName)
	}
	const emitWinEvent = (winner: string) => {
		socket.emit("win", { winner: winner, room: gameRoom })
	}
	const handleLogout = () => {
		dispatch(deleteGame())
		setOpponent(null)
		dispatch(setUserInfo(null))
		setSocketId("")
		socket.emit("cleanUp", socketId)

		socket.disconnect()
	}
	const handleLeaveRoom = () => {
		dispatch(setGameRoom({ roomName: "", users: [] }))
		dispatch(setGameBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]))
		setOpponent(null)
		setIsYourTurn(false)
		socket.emit("leaveRoom", socketId, gameRoom?.roomName)
	}

	// useEffect(() => {
	// 	if (gameRoom) {
	// 		//get room that equals gameRoom
	// 		const room = roomList.find(
	// 			(room: Room) => room.roomName === gameRoom
	// 		)
	// 		console.log("room no useEffect de gameroom: ", room)
	// 		if (room?.users.length === 2) {
	// 			socket.emit("startGame", socketId, gameRoom)
	// 			setOpponent(
	// 				room.users.find(
	// 					(user: User) => user.userId !== user.userId
	// 				) || null
	// 			)
	// 		}
	// 	}
	// }, [roomList])

	useEffect(() => {
		console.log("gameroom no UseEffect", gameRoom)
		gameRoom && setMyGameRoom(gameRoom.roomName)
	}, [gameRoom])

	useEffect(() => {
		console.log("roomList mudou")
	}, [roomList])

	useEffect(() => {
		if (opponent) {
			console.log("opponent: ", opponent.userName)
		}
	}, [opponent])

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
		})

		setSocketId(socket.id)
		socket.emit("registerUser", { userName: user, userId: socket.id })

		//connect user to room
		socket.emit("getInfoOnConnect")
		socket.on(
			"getInfoOnConnectRes",
			(data: { rooms: Room[]; users: User[] }) => {
				setRoomList(data.rooms)
				setUserList(data.users)
			}
		)
		socket.on("userJoined", (opponent, room) => {
			console.log("userJoined: ", opponent)
			console.log("room no userJoined", room)
			notify("Usuário entrou na sua sala")
			dispatch(setGameRoom(room))
			setOpponent(opponent)
			setPlayer("O")
			setIsYourTurn(true)
		})
		socket.on("usersUpdate", (users: User[]) => {
			setUserList(users)
		})
		socket.on("roomsUpdate", (rooms: Room[]) => {
			console.log("setando rooms com ", rooms)
			setRoomList(rooms)
		})
		socket.on("joinRoomRes", (room: string) => {})

		//socket disconnect listener
		socket.on("disconnect", (reason) => {
			if (gameRoom) socket.emit("leaveRoom", gameRoom.roomName)
			dispatch(setUserInfo(null))
			console.log("desconectado")
			socket.disconnect()
		})
		socket.on("moveRes", (moveData) => {
			dispatch(setGameBoard(moveData.gameBoard))
			if (moveData.winner) {
				console.log("winner: ", moveData.winner)
				notify("Você perdeu...")
				dispatch(deleteGame())
				setMyGameRoom("")
				dispatch(setGameRoom({ roomName: "", users: [] }))
				setOpponent(null)
				setIsYourTurn(false)
				socket.emit("leaveGameRoom", moveData.room)
			} else setIsYourTurn(true)
		})
		socket.on("userLeft", () => {
			notify("O seu oponente saiu")
			setOpponent(null)
		})
		return () => {
			// socket.emit("cleanUp")
			socket.disconnect()
			socket.removeAllListeners()
			//remove window event listener
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
							<GameLabel>
								Jogando contra: {opponent.userName}{" "}
							</GameLabel>
							{isYourTurn && <TurnLabel>Seu turno!</TurnLabel>}
							{!isYourTurn && (
								<TurnLabel>
									{opponent.userName} está fazendo sua
									jogada...
								</TurnLabel>
							)}
							{opponent && gameBoard && (
								<GameBoard>
									<BoardRow>
										<BoardCell
											props={gameBoard[0]}
											onClick={
												isYourTurn
													? () => handleCellClick(0)
													: null
											}
										></BoardCell>
										<BoardCell
											props={gameBoard[1]}
											onClick={
												isYourTurn
													? () => handleCellClick(1)
													: null
											}
										></BoardCell>
										<BoardCell
											props={gameBoard[2]}
											onClick={
												isYourTurn
													? () => handleCellClick(2)
													: null
											}
										></BoardCell>
									</BoardRow>
									<BoardRow>
										<BoardCell
											props={gameBoard[3]}
											onClick={
												isYourTurn
													? () => handleCellClick(3)
													: null
											}
										></BoardCell>
										<BoardCell
											props={gameBoard[4]}
											onClick={
												isYourTurn
													? () => handleCellClick(4)
													: null
											}
										></BoardCell>
										<BoardCell
											props={gameBoard[5]}
											onClick={
												isYourTurn
													? () => handleCellClick(5)
													: null
											}
										></BoardCell>
									</BoardRow>
									<BoardRow>
										<BoardCell
											props={gameBoard[6]}
											onClick={
												isYourTurn
													? () => handleCellClick(6)
													: null
											}
										></BoardCell>
										<BoardCell
											props={gameBoard[7]}
											onClick={
												isYourTurn
													? () => handleCellClick(7)
													: null
											}
										></BoardCell>
										<BoardCell
											props={gameBoard[8]}
											onClick={
												isYourTurn
													? () => handleCellClick(8)
													: null
											}
										></BoardCell>
									</BoardRow>
								</GameBoard>
							)}
						</>
					)}
					{!socket.id && (
						<Row>
							<LoadingDiv />
							<LoadingDiv />
							<LoadingDiv />
							<LoadingDiv />

							<LoadingDiv />
						</Row>
					)}
					{!opponent && socket.id && (
						<>
							<GameLabel>
								Crie ou Selecione uma sala para jogar!
							</GameLabel>
						</>
					)}
					{gameRoom?.roomName && (
						<CreateRoomButton onClick={handleLeaveRoom}>
							Sair da {gameRoom.roomName}
						</CreateRoomButton>
					)}
					{!gameRoom?.roomName && socket.id && (
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
}
export default Game
