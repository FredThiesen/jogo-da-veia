import { Game } from "../../interfaces/gameType"

const initialState: Game = {
	gameRoom: null,
	gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
}

export const gameReducer: any = (
	state: Game = initialState,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case "SAVEGAMEROOM":
			state = {
				...state,
				gameRoom: {
					roomName: action.payload.roomName,
					users: action.payload.users,
				},
			}
			return state
		case "SAVEGAMEBOARD":
			return {
				...state,
				gameBoard: action.payload,
			}
		case "DELETEGAME":
			return initialState
		default:
			return state
	}
}
