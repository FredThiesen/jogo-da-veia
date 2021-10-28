import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Global from "./styles/Global"
// Import the functions you need from the SDKs you need

ReactDOM.render(
	<React.StrictMode>
		<Global />
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
