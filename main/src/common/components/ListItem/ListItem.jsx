import "./listItem.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ListItem = ({ index, item, isPlus = true }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	const [isClicked, setIsClicked] = useState(isPlus);
	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await fetch("http://localhost:8800/api/movies/find/" + item, {
					headers: {
						token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
					},
				});
				const result = await res.json();
				console.log(result);
				setMovie(result);
			} catch (err) {
				console.log(err);
			}
		};
		getMovie();
	}, [item]);

	const handleIconClick = async () => {
		try {

			const res = await fetch(`http://localhost:8800/api/users/list/${item}`, {
				method: "POST",
				headers: {
					token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
				},
			});

			console.log(res.data);
			setIsClicked(true);
		} catch (err) {

			console.log(err);
		}
	};
	const handleIconClickRem = async () => {
		try {

			const res = await fetch(`http://localhost:8800/api/users/list/${item}`, {
				method: "DELETE",
				headers: {
					token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
				},
			});

			console.log(res.data);
			setIsClicked(false);
		} catch (err) {
			// Обработка ошибки запроса
			console.log(err);
		}
	};
	return (

		<div
			className="listItem"
			style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img src={movie?.imgSm} alt="" />
			{isHovered && (
				<>
					<video src={movie.trailer} autoPlay={true} loop />
					<div className="itemInfo">
						<div className="icons">
							<Link to={`/video/${encodeURIComponent(movie.video)}`}><PlayArrowIcon className="icon" />	</Link>
							{isClicked ? <AddIcon className="icon" onClick={handleIconClick} /> : <RemoveIcon className="icon" onClick={handleIconClickRem} />}


							{/* <ThumbUpAltIcon className="icon" />
							<ThumbDownAltIcon className="icon" /> */}
						</div>
						<div className="itemInfoTop">
							<span>{movie.duration}</span>
							<span className="limit">+{movie.limit}</span>
							<span>{movie.year}</span>
						</div>
						<div className="desc">{movie.desc}</div>
						<div className="genre">{movie.genre}</div>
					</div>
				</>
			)}
		</div>

	);
}

export default ListItem;