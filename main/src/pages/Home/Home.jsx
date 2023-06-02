import Navbar from "../../common/components/Navbar/Navbar";
import Featured from "../../common/components/Featured/Featured";
import List from "../../common/components/List/List";
import "./home.scss"


const Home = () => {
	return (
		<div className="home">
			<Navbar />
			<Featured />
			<List />
			<List />
			<List />
			<List />
		</div>
	);
};

export default Home;