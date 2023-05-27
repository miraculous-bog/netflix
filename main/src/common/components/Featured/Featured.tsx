import React, { FC } from 'react';
// import { InfoOutlined, PlayArrow } from '@material-ui/icons';

interface FeaturedProps {
	type: string;
	setGenre: (genre: string) => void;
}

const Featured: FC<FeaturedProps> = ({ type, setGenre }) => {
	// const [content, setContent] = useState({});

	// useEffect(() => {
	// 	const getRandomContent = async () => {
	// 		try {
	// 			const res = await axios.get(`/movies/random?type=${type}`, {
	// 				headers: {
	// 					token:
	// 						"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
	// 				},
	// 			});
	// 			setContent(res.data[0]);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getRandomContent();
	// }, [type]);

	// console.log(content);
	return (
		<div className="featured">
			{type && (
				<div className="category">
					<span>{type === 'movies' ? 'Movies' : 'Series'}</span>
					<select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
						<option>Genre</option>
						<option value="adventure">Adventure</option>
						<option value="comedy">Comedy</option>
						<option value="crime">Crime</option>
						<option value="fantasy">Fantasy</option>
						<option value="historical">Historical</option>
						<option value="horror">Horror</option>
						<option value="romance">Romance</option>
						<option value="sci-fi">Sci-fi</option>
						<option value="thriller">Thriller</option>
						<option value="western">Western</option>
						<option value="animation">Animation</option>
						<option value="drama">Drama</option>
						<option value="documentary">Documentary</option>
					</select>
				</div>
			)}
			<img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
			<div className="info">
				<img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
				<span className="desc">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, repellendus perspiciatis? A culpa sed autem nesciunt iure, laborum perferendis in inventore vitae expedita, delectus incidunt atque! Alias dolorum accusantium provident!
				</span>
				<div className="buttons">
					<button className="play">
						{/* <PlayArrow /> */}
						<span>Play</span>
					</button>
					<button className="more">
						{/* <InfoOutlined /> */}
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Featured;
