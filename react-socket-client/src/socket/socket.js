import React from "react"
import io from "socket.io-client"
import { SOCKET } from "../config"

export const socket = io(SOCKET.url, {
	withCredentials: true,
	extraHeaders: {
		"my-custom-header": "abcd",
	},
})
export const SocketContext = React.createContext(socket)
