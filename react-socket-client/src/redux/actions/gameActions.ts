import { Room } from "../../interfaces/roomType"

export const setGameRoom = (gameRoom: Room | null) => ({
	type: "SAVEGAMEROOM",
	payload: gameRoom,
})

export const setGameBoard = (gameBoard: number[]) => ({
	type: "SAVEGAMEBOARD",
	payload: gameBoard,
})
export const deleteGame = () => ({
	type: "DELETEGAME",
})
