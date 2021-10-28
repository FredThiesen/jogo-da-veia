import React, { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { io } from "socket.io-client"
import { setUserInfo } from "../redux/actions/userActions"
import { Button } from "../styles/Styles"

function Game() {
	const dispatch = useDispatch()
	const socket = io("http://127.0.0.1:3000")

	useEffect(() => {
		socket.on("connect", () => {
			alert(`conectado com id: ${socket.id}`)
		})
		// socket event listener
		socket.on("message", (message: string) => {
			alert(message)
		})
		//socket disconnect listener
		socket.on("disconnect", () => {
			alert("desconectado")
		})
		return () => {}
	}, [socket])
	return (
		<>
			{/* tic tac toe board */}
			{/* <Board /> */}
			<div>{/* status */}</div>

			<Button onClick={() => dispatch(setUserInfo(null))}> Sair </Button>
		</>
	)
}
export default Game
