import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import firebaseLogin from "../firebaseFunctions/firebaseLogin"
import { firebaseSignUp } from "../firebaseFunctions/firebaseSignUp"
import { setUserInfo } from "../redux/actions/userActions"

import {
	Button,
	InputContainer,
	StyledInput,
	Title,
	TitleMedium,
} from "../styles/Styles"
//@ts-ignore
import tictactoe from "./../assets/images/tictactoe.png"

export default function Login() {
	const notify = (message: string) => toast(message)
	const user = useSelector((state: any) => state.user)
	useEffect(() => {
		if (user) {
			console.log(user)
		}
	}, [user])
	const dispatch = useDispatch()
	//create useState for login
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [loginState, setLoginState] = useState<boolean>(true)

	const capitalize = (s: string | null) => {
		if (s) return s[0].toUpperCase() + s.slice(1)
	}

	// function that cuts the name if it is too long
	const cutName = (s: string | undefined) => {
		if (s) {
			if (s.length > 15) {
				return s.slice(0, 15) + "..."
			} else {
				return s
			}
		}
	}

	const handleLogin = () => {
		if (username.length > 0 && password.length > 0) {
			//firebase login
			firebaseLogin(username, password)
				.then((user) => {
					dispatch(
						setUserInfo(
							cutName(capitalize(user.user.email!.split("@")[0]))
						)
					) // salva user no redux
					console.log("logado com sucesso!")
				})
				.catch((error) => {
					error.code === "auth/user-not-found" &&
						alert("Usuário não encontrado")
					error.code === "auth/wrong-password" &&
						alert("Senha incorreta")
					error.code === "auth/email-already-in-use" &&
						alert("Email já está em uso")
					error.code === "auth/invalid-email" &&
						alert("Email inválido")
				})
		} else alert("preencha todos os campos")
	}
	const handleSignUp = () => {
		if (username.length > 0 && password.length > 0) {
			// if (username.length > 30) {
			// 	notify("O nome de usuário não pode ter mais que 15 caracteres")
			// 	return
			// }
			//firebase signUp
			// else
			firebaseSignUp(username, password)
				.then((user) => {
					notify("Cadastrado com sucesso! Faça seu login.")
					console.log("cadastrado com sucesso!")
					setLoginState(true)
				})
				.catch((error) => {
					error.code === "auth/email-already-in-use" &&
						alert("Email já está em uso")
					error.code === "auth/invalid-email" &&
						alert("Email inválido")
					error.code === "auth/weak-password" &&
						alert("Senha muito fraca")
				})
		} else alert("preencha todos os campos")
	}

	//se loginState for false, renderiza o signup
	const handleShowSignUp = () => {
		setLoginState(false)
	}
	//se loginState for true, mostra login
	const handleShowLogin = () => {
		setLoginState(true)
	}

	return (
		<>
			<Toaster />
			{/* //login form */}
			<img src={tictactoe} alt="logo" />
			<Title>Jogo da Véia</Title>
			By Ricardo T.
			{loginState && (
				<InputContainer>
					<TitleMedium> Faça seu login </TitleMedium>
					<StyledInput
						placeholder="Email"
						value={username}
						onChange={(text: any) => setUsername(text.target.value)}
					/>
					<StyledInput
						type="password"
						placeholder="Senha"
						value={password}
						onChange={(text: any) => setPassword(text.target.value)}
					/>
					<Button onClick={handleLogin}>Login </Button>
					<TitleMedium>ou</TitleMedium>
					<Button onClick={handleShowSignUp}>Cadastrar </Button>
				</InputContainer>
			)}
			{!loginState && (
				<InputContainer>
					<TitleMedium>Faça seu Cadatro</TitleMedium>
					<StyledInput
						placeholder="Email"
						value={username}
						onChange={(text: any) => setUsername(text.target.value)}
					/>
					<StyledInput
						type="password"
						placeholder="Senha"
						value={password}
						onChange={(text: any) => setPassword(text.target.value)}
					/>
					<Button onClick={handleSignUp}>Cadastrar </Button>
					<TitleMedium>ou</TitleMedium>
					<Button onClick={handleShowLogin}>Login </Button>
				</InputContainer>
			)}
			{user && <Redirect to="/game" />}
			{/* button that submits */}
		</>
	)
}
