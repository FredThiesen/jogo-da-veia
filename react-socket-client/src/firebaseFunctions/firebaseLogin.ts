import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function firebaseLogin(username: string, password: string) {
	// firebase login
	const auth = getAuth()
	return signInWithEmailAndPassword(auth, username, password)
}
