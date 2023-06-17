import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import ListItem from "../ListItem/ListItem";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../authContext/AuthContext";

import styles from "./modal.module.css";

const Modal = ({ onClose }) => {
	const [movies, setMovies] = useState([]);
	const location = useLocation();
	const { user } = useContext(AuthContext);
	console.log(user);
	const navigate = useNavigate();
	const handleRedirect = () => {
		navigate('/main', { replace: true });
	};
	useEffect(() => {
		const fetchMovies = async () => {
			try {

				const res = await fetch("http://localhost:8800/api/users/find/" + user._id, {
					headers: {
						token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
					},
				});
				const result = await res.json();
				console.log(result);

				setMovies(result.list);
			} catch (err) {
				console.log(err);
			}
		};
		fetchMovies();
	}, []);

	return (
		<div className={styles.modal}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>My List</h2>
					<CloseIcon className={styles.icon} onClick={handleRedirect} />
				</div>
				<div className={styles.grid}>
					{movies.map((movie) => (
						<Link to={`/video/${encodeURIComponent(movie.trailer)}`} key={movie.id}>
							<ListItem index={movie} item={movie} isPlus={user.list.includes(movie) ? false : true} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Modal;