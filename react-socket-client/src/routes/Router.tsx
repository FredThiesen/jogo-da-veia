import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"

//Routes
import Login from "../screens/Login"
import Game from "../screens/Game"
import { ProtectedRoute } from "./ProtectedRoute"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { SocketContext, socket } from "../socket/socket"

const auth = getAuth()

export const RouterComponent = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/login" />
				</Route>
				<Route path="/login">
					<Login />
				</Route>

				<ProtectedRoute path="/game">
					<SocketContext.Provider value={socket}>
						<Game />
					</SocketContext.Provider>
				</ProtectedRoute>
			</Switch>
		</Router>
	)
}
