import React, { useEffect } from "react"
import { Provider } from "react-redux"

import initializeFirebase from "./firebaseApp"
import store from "./redux/store/store"
import { RouterComponent } from "./routes/Router"
import { Body } from "./styles/Styles"

function App() {
	useEffect(() => {
		initializeFirebase()
	}, [])
	return (
		<Provider store={store}>
			<Body>
				<RouterComponent />
			</Body>
		</Provider>
	)
}

export default App
