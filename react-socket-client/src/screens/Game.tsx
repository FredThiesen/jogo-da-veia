import React, { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { io } from "socket.io-client"
import { setUserInfo } from "../redux/actions/userActions"
import { BoardCell, BoardRow, GameBoard } from "../styles/BoardStyles"
import { Button } from "../styles/Styles"

const Game = React.memo(() => {
	const dispatch = useDispatch()
	const socket = io("http://127.0.0.1:3000")

	const handleCellClick = (cell: string) => {
		console.log(cell)
		socket.emit("cellClick", cell)
	}
	const isYourTurn = false

	useEffect(() => {
		console.log("1 render")
		socket.on("connect", () => {
			alert(`conectado com id: ${socket.id}`)
		})
		// socket event listener
		socket.on("message", (message: string) => {
			alert(message)
		})
		//socket disconnect listener
		socket.on("disconnect", () => {
			dispatch(setUserInfo(null))
			alert("desconectado")
		})
		return () => {}
	}, [socket])
	return (
		<>
			{/* tic tac toe board */}
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
