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
