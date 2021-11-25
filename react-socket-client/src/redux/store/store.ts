import { combineReducers, createStore } from "redux"
import { gameReducer } from "../reducers/gameReducer"
import { userInfoReducer } from "../reducers/userReducer"

const rootReducer = combineReducers({
	user: userInfoReducer,
	game: gameReducer,
})
const store = createStore(rootReducer)

export default store
