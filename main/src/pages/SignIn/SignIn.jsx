import { useContext, useState, useEffect } from "react";
import { login } from "../../authContext/apiCalls";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import styles from "./signIn.module.css";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch, user } = useContext(AuthContext);
	console.log(dispatch);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) navigate("/main", { replace: true });
	}, [user]);

	const handleLogin = async (e) => {
		e.preventDefault();
		await login({ email, password }, dispatch);
	};

	return (
		<div className={styles.login}>
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
					<h1>Sign In</h1>
					<input
						type="email"
						placeholder="Email or phone number"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={styles.input}
					/>
					<button className={styles.loginButton} onClick={handleLogin}>
						Sign In
					</button>
					<span>
						New to Netflix? <b><Link to="/sign-up">Sign up now.</Link></b>
					</span>
					{/* <small>
						This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
						<b>Learn more</b>.
					</small> */}
				</form>
			</div>
		</div>
	);
};

export default SignIn;
