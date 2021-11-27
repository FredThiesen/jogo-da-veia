export function checkDraw(board: number[]) {
	if (board.includes(0)) {
		return false
	} else {
		//se não tiver nenhum 0, é empate
		return true
	}
}
