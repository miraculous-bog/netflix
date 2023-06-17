import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from "./video.module.css";
import { Link, useParams } from 'react-router-dom';

const Video = () => {
	const { link } = useParams();
	return (
		<div className={styles.watch}>
			<Link to="/main">
				<div className={styles.back}>
					<ArrowBackIosNewIcon />
					Home
				</div>
			</Link>
			<video className={styles.video} autoPlay loop src={link} progress="true" controls />
		</div>
	);
}

export default Video;