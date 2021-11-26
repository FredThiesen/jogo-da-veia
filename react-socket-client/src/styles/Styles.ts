import styled, { keyframes } from "styled-components"

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
	justify-content: space-around;
	height: 90vh;
	width: 100vw;
	background: #f0f0f0;
	@media (max-width: 800px) {
		flex-direction: column;
		position: relative;
		justify-content: flex-start;
	}
`
export const WelcomeLabel = styled.h1`
	font-size: 2rem;
	text-align: center;
	color: #f0f0f0;
	margin-inline: 10px;
	@media (max-width: 800px) {
		font-size: 1.3rem;
	}
`

export const SideBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90vh;
	width: 30vw;
	padding-left: 15px;
	padding-right: 15px;
	padding: 15px;
	margin-left: 15px;

	@media (max-width: 800px) {
		flex-direction: row;
		position: relative;
		width: 100vw;
		justify-content: space-around;
		height: 33vh;
	}
`

export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-inline: 10px;
	height: 40%;
	width: 100%;
`
export const UsersContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	height: 60%;
	min-height: 150px;
	min-width: 235px;
	max-width: 290px;
	width: 100%;
	overflow-y: auto;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px #ccc;
	padding-left: 10px;
	padding: 10px;
	@media (max-width: 800px) {
		min-width: 150px;
	}
`
export const UserContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	padding: 10px;
	height: 10%;
	width: 100%;
	font-size: 16px;
	font-weight: 500;
`
export const OnlineFlag = styled.span`
	color: limegreen;
	font-size: 2em;
	margin-right: 3px;
	margin-top: 1px;
`
export const Label = styled.label`
	font-size: 1.2rem;
	color: #141c98;
	flex-wrap: nowrap;
	align-self: flex-start;
	margin-bottom: 5px;
	@media (max-width: 800px) {
		font-size: 1.1rem;
	}
`
export const RoomListContainer = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	overflow-y: auto;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px #ccc;
	height: 50%;
	width: 100%;
	min-height: 150px;
	min-width: 235px;
	max-width: 290px;
	@media (max-width: 800px) {
		min-width: 150px;
	}
`
export const RoomContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-top: 5px;
	padding-bottom: 2px;
	padding-left: 5px;
	padding-right: 5px;
	height: 10%;
	min-height: 40px;
	width: 100%;
	border-bottom: 1px solid #141c98;
	font-size: 16px;
	font-weight: 500;
	@media (max-width: 560px) {
		font-size: 12.5px;
		font-weight: 400;
	}
`
export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2px;
`
export const RoomUsersLabel = styled.h1`
	font-size: 0.8em;
	text-align: center;
	color: #141c98;
`
export const JoinRoomButton = styled.button`
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 8px;
	padding-left: 4px;
	padding-right: 4px;
	height: 80%;

	&:hover {
		cursor: pointer;
		background: #fff;
		color: #141c98;
		transition: 0.25s;
		border: 1px solid #141c98;
	}
`
export const MiddleBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 100%;

	/* width: 50vw; */
	padding: 20px;
`
export const GameLabel = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: #141c98;
	margin: 15px;
	@media (max-width: 800px) {
		font-size: 1.1rem;
		margin: 10px;
	}
`
export const TurnLabel = styled.h1`
	font-size: 1.3em;
	text-align: center;
	color: #141c98;
	margin: 15px;
	@media (max-width: 800px) {
		font-size: 1.1rem;
		margin: 10px;
	}
`
export const CreateRoomButton = styled.button`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	margin-bottom: 8px;
	width: 200px;

	&:hover {
		cursor: pointer;
		background: #fff;
		color: #141c98;
		transition: 0.25s;
		border: 1px solid #141c98;
	}
`

const Animation = keyframes`

  0%, 100%{
    transform: scale(0.2);
    background-color: #30FFB7;
  }
  40%{
    transform: scale(1);
    background-color: #07DEFF;
  }
  50%{
    transform: scale(1);
    background-color: #0761FF;
  }
}
`
export const LoadingDiv = styled.div`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	/* transform: scale(0); */
	background-color: red;
	animation: ${Animation} 2.5s ease-in-out infinite;
	display: inline-block;
	margin: 0.5rem;
`
export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
`
export const HeaderSideSection = styled.div`
	display: flex;
	width: 25%;
	height: 100%;
	align-items: center;
	justify-content: space-around;
`
export const HeaderMiddleSection = styled.div`
	display: flex;
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: space-around;
`
export const RightBar = styled.div`
	width: 30vw;
	height: 0px;
	@media (max-width: 800px) {
		width: 0px;
	}
	@media (max-width: 1250px) {
		width: 10vw;
	}
`

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

export const Spinner = styled.div`
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);

	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid #0761ff;
	background: transparent;
	width: 24px;
	height: 24px;
	border-radius: 50%;
`
