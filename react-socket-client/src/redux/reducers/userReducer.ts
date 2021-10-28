export const userInfoReducer: any = (
	state: any = null,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case "SAVEUSERINFO":
			return action.payload
		default:
			return state
	}
}
