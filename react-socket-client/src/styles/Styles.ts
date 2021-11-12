import styled from "styled-components"

export const StyledInput = styled.input`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	margin-bottom: 8px;
	width: 100%;
`
export const Body = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
`

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;
	padding: 30px;
	width: 300px;
`
export const Button = styled.button`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	margin-bottom: 8px;
	width: 100%;

	&:hover {
		cursor: pointer;
		background: #fff;
		color: #141c98;
		transition: 0.25s;
		border: 1px solid #141c98;
	}
`
export const Title = styled.h1`
	font-size: 2em;
	text-align: center;
	color: #141c98;
	margin: 15px;
`
export const TitleMedium = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: #141c98;
	margin: 15px;
`

export const Header = styled.div`
	background: #141c98;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 10vh;
	width: 100vw;
`
export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90vh;
	width: 100vw;
`
export const WelcomeLabel = styled.h1`
	font-size: 2em;
	text-align: center;
	color: #141c98;
	margin: 15px;
`

export const SideBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90vh;
	width: 20vw;
	padding-left: 15px;
	padding-right: 15px;
`
export const MiddleBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 60vw;
`
export const RoomListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	height: 60%;
	width: 100%;
`
export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 40%;
	width: 100%;
`
export const UsersContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	height: 60%;
	width: 100%;
	overflow-y: auto;
	border: 1px solid #ccc;
	padding-left: 10px;
`
export const UserContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	padding: 10px;
	height: 10%;
	width: 100%;
`
export const OnlineFlag = styled.span`
	color: limegreen;
	font-size: 2em;
	margin-right: 3px;
	margin-top: 1px;
`
export const Label = styled.label`
	font-size: 1.2em;
	color: #141c98;
	align-self: flex-start;
`
