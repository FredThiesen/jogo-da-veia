//function to signup to firebase

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

export const firebaseSignUp = (email: string, password: string) => {
	const auth = getAuth()
	return createUserWithEmailAndPassword(auth, email, password)
}
