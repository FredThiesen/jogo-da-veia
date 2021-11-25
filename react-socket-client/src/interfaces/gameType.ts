import { Room } from "./roomType"
import { User } from "./userType"

export interface Game {
	gameRoom?: Room | null
	gameBoard?: number[]
}
