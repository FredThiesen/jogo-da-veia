import { combineReducers, createStore } from "redux"
import { userInfoReducer } from "../reducers/userReducer"

const rootReducer = combineReducers({
	user: userInfoReducer,
})
const store = createStore(rootReducer)

export default store
