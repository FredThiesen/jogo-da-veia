import styled from "styled-components"

import X from "./../assets/images/x.png"
import O from "./../assets/images/o.png"

export const GameBoard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 400px;
	height: 400px;
	background-color: transparent;
`
export const BoardRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: ${100 / 3}%;
	/* border: 1px solid palevioletred; */
`

export const BoardCell = styled.div<any>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: ${100 / 3}%;
	height: 100%;
	border: 1px solid palevioletred;
	background-size: 80%;
	background-repeat: no-repeat;
	background-position: center;

	&:hover {
		background-color: #666;
		transition: 200ms ease-in-out;
	}
	//conditionaly render an x or o
	${({ props }: any) =>
		props === "X"
			? `
        background-image: url(${X});
    `
			: props === "O"
			? `
        background-image: url(${O});
    `
			: ``}
`
