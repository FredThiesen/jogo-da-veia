import React from "react"
import io from "socket.io-client"
import { SOCKET } from "../config"

export const socket = io(SOCKET.url)
export const SocketContext = React.createContext(socket)
