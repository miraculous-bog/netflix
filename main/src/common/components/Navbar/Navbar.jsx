import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../authContext/AuthContext";
// import { logout } from "../../authContext/AuthActions";

import { AuthContext } from '../../../authContext/AuthContext';
import { logout } from '../../../authContext/AuthActions';
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext);


	const handleLogout = () => {
		dispatch(logout());
		localStorage.clear();
		navigate('/sign-in', { replace: true });
	}

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};
	return (
		<div className={isScrolled ? "navbar scrolled" : "navbar"}>
			<div className="container">
				<div className="left">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>
					<Link to="/main" className="link">
						<span>Homepage</span>
					</Link>
					<Link to="/main/series" className="link">
						<span className="navbarmainLinks">Series</span>
					</Link>
					<Link to="/main/movie" className="link">
						<span className="navbarmainLinks">Movies</span>
					</Link>
					{/* <span>New and Popular</span> */}
					<span onClick={() => navigate('/main/listAdded')}>My List</span>
				</div>
				<div className="right">
					<SavedSearchIcon className="icon" />
					<span>KID</span>
					<NotificationsActiveIcon className="icon" />
					<img
						src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						alt=""
					/>
					<div className="profile">
						<ArrowDropDownIcon className="icon" />
						<div className="options">
							<span>Settings</span>
							<span onClick={() => handleLogout()}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;