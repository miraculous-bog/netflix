import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./video.scss";
import { Link, useParams } from 'react-router-dom';

const Video = () => {
	const link = useParams();
	console.log(link);
	return (
		<div className="watch">
			<Link to="/main">
				<div classsName="back">
					<ArrowBackIosNewIcon />
					Home
				</div>
			</Link>
			<video className="video" autoPlay={true} loop src={link.link} progress="true" controls />
			{/* <video className="video" autoPlay controls src={movie} progress="true" /> */}
		</div>
	);
}

export default Video;
