import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./signUp.module.css";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();



	const handleRegistr = async (e) => {
		e.preventDefault();
		try {
			console.log(email, username, password);
			await axios.post("auth/register", { email, username, password });
			navigate("/sign-in", { replace: true });
		} catch (err) { }
	};
	return (
		<div className={styles.register}>
			<div className={styles.top}>
				<div className={styles.wrapper}>
					<img
						className={styles.logo}
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>

				</div>
			</div>


			<div className={styles.container}>
				<form>

					<input
						type="email"
						placeholder="Email or phone number"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.input}
					/>
					<input
						type="text"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={styles.input}
					/>
					<button className={styles.loginButton} onClick={handleRegistr}>
						Sign Up
					</button>
					<span>
						Have you got Netflix? <b><Link to="/sign-up">Sign in now.</Link></b>
					</span>
					{/* <small>
						This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
						<b>Learn more</b>.
					</small> */}
				</form>
			</div>

		</div>
	);
}

export default SignUp;