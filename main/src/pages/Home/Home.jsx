import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../common/components/Navbar/Navbar";
import Featured from "../../common/components/Featured/Featured";
import List from "../../common/components/List/List";
import "./home.scss"


const Home = ({ type }) => {
	const [lists, setLists] = useState([]);
	const [genre, setGenre] = useState(null);
	console.log(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`);

	useEffect(() => {
		const getRandomLists = async () => {
			try {
				const res = await fetch(
					`http://localhost:8800/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
					{
						headers: {
							token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
						},
					}
				);
				const result = await res.json();
				console.log(result);
				setLists(result); // Update this line
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomLists(lists);
		console.log('liiiists', lists);
	}, [type, genre]);

	return (
		<div className="home">
			<Navbar />
			<Featured type={type} setGenre={setGenre} />
			{lists && lists.map((list) => <List list={list} key={list.id} />)}
		</div>
	);
};

export default Home;