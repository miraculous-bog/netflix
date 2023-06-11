import "./listItem.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ListItem = ({ index, item }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});

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


	return (
		<Link to={`/video/${encodeURIComponent(movie.video)}`}>
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
								<PlayArrowIcon className="icon" />
								<AddIcon className="icon" />
								<ThumbUpAltIcon className="icon" />
								<ThumbDownAltIcon className="icon" />
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
		</Link>
	);
}

export default ListItem;