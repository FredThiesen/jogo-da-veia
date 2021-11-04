import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { setUserInfo } from "../redux/actions/userActions"
import { BoardCell, BoardRow, GameBoard } from "../styles/BoardStyles"
import { Button } from "../styles/Styles"

const Game = React.memo(() => {
	const user = useSelector((state: any) => state.user.email.split("@")[0])
	const dispatch = useDispatch()
	const socket = io("http://127.0.0.1:3000")

	const handleCellClick = (cell: string) => {
		console.log(cell)
		socket.emit("cellClick", cell)
	}
	const isYourTurn = false
	//function that capitalizes first letter of string
	const capitalize = (s: string) => {
		if (typeof s !== "string") return ""
		return s.charAt(0).toUpperCase() + s.slice(1)
	}

	useEffect(() => {
		console.log("1 render")
		socket.on("connect", () => {
			console.log(`conectado com id: ${socket.id}`)
		})
		//connect user to room

		// socket event listener
		socket.on("message", (message: string) => {
			alert(message)
		})
		//socket disconnect listener
		socket.on("disconnect", (reason) => {
			if (reason === "io server disconnect") {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect()
			}
			dispatch(setUserInfo(null))
			console.log("desconectado")
		})
		//receive all rooms
		socket.on("getRooms", (rooms) => {
			console.log(rooms)
		})
		socket.on("testeRes", (res) => {
			console.log(res)
		})
		return () => {}
	}, [])
	return (
		<>
			Bem vindo, {capitalize(user)}!{/* tic tac toe board */}
			<Button onClick={() => socket.emit("join", capitalize(user.email))}>
				Criar sala
			</Button>
			<Button onClick={() => socket.emit("getRooms")}>Ver Salas</Button>
			<Button onClick={() => socket.emit("teste")}>teste</Button>
			<GameBoard>
				<BoardRow>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("11") : null
						}
					></BoardCell>
					<BoardCell
						props={"O"}
						onClick={
							isYourTurn ? () => handleCellClick("12") : null
						}
					></BoardCell>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("13") : null
						}
					></BoardCell>
				</BoardRow>
				<BoardRow>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("21") : null
						}
					></BoardCell>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("22") : null
						}
					></BoardCell>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("23") : null
						}
					></BoardCell>
				</BoardRow>
				<BoardRow>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("31") : null
						}
					></BoardCell>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("32") : null
						}
					></BoardCell>
					<BoardCell
						props={"X"}
						onClick={
							isYourTurn ? () => handleCellClick("33") : null
						}
					></BoardCell>
				</BoardRow>
			</GameBoard>
			<div>{/* status */}</div>
			<Button onClick={() => dispatch(setUserInfo(null))}> Sair </Button>
		</>
	)
})
export default Game
