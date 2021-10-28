import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBbwXaKIK3FS5ULlGnBnJni6Gr4NNhs4aY",
	authDomain: "react-socket-game.firebaseapp.com",
	projectId: "react-socket-game",
	storageBucket: "react-socket-game.appspot.com",
	messagingSenderId: "638030912311",
	appId: "1:638030912311:web:adc1ce22561030be0418b2",
}
const firebase = initializeApp(firebaseConfig)
// Initialize Firebase
//export function that returns firebase
export default function initializeFirebase() {
	console.log("inicializando firebase")
	return firebase
}
