import { getAuth } from "firebase/auth"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

export const ProtectedRoute = (props: any) => {
	const user = useSelector((state: any) => state.user)
	useEffect(() => {
		console.log("user", user)
	}, [user])
	if (!user) {
		return <Redirect to="/login" />
	}
	return <Route {...props} />
}
