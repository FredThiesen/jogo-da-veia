import React, { useEffect } from "react"
import { io } from "socket.io-client"
import "./App.css"

function App() {
	const socket = io("http://127.0.0.1:3000")

	// first render
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
		<div className="App">
			{/* tic tac toe layout */}
			<div className="tic-tac-toe">
				<div className="tic-tac-toe-board-grid">
					<div className="tic-tac-toe-board-row">
						<div className="tic-tac-toe-board-cell"></div>
						<div className="tic-tac-toe-board-cell"></div>
						<div className="tic-tac-toe-board-cell"></div>
					</div>
					<div className="tic-tac-toe-board-row">
						<div className="tic-tac-toe-board-cell"></div>
						<div className="tic-tac-toe-board-cell"></div>
						<div className="tic-tac-toe-board-cell"></div>
					</div>
					<div className="tic-tac-toe-board-row">
						<div className="tic-tac-toe-board-cell"></div>
						<div className="tic-tac-toe-board-cell"></div>
						<div className="tic-tac-toe-board-cell"></div>
					</div>
				</div>
				<div className="tic-tac-toe-board-controls">
					<div className="tic-tac-toe-board-controls-row">
						<div className="tic-tac-toe-board-controls-cell">
							<button className="tic-tac-toe-board-controls-cell-button">
								<span className="tic-tac-toe-board-controls-cell-button-text">
									New Game
								</span>
							</button>
						</div>
					</div>
					<div className="tic-tac-toe-board-controls-row">
						<div className="tic-tac-toe-board-controls-cell">
							<button className="tic-tac-toe-board-controls-cell-button">
								<span className="tic-tac-toe-board-controls-cell-button-text">
									Reset
								</span>
							</button>
						</div>
						<div className="tic-tac-toe-board-controls-cell">
							<button className="tic-tac-toe-board-controls-cell-button">
								<span className="tic-tac-toe-board-controls-cell-button-text">
									Undo
								</span>
							</button>
						</div>
						<div className="tic-tac-toe-board-controls-cell">
							<button className="tic-tac-toe-board-controls-cell-button">
								<span className="tic-tac-toe-board-controls-cell-button-text">
									Redo
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
