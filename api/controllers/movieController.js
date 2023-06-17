const movieService = require('../services/movieService');

const createMovie = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json("Access denied!");
		}
		const newMovie = req.body;
		const savedMovie = await movieService.createMovie(newMovie);
		res.status(201).json(savedMovie);
	} catch (err) {
		res.status(500).json(err);
	}
};

const updateMovie = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json("Access denied!");
		}
		const updatedMovie = await movieService.updateMovieById(req.params.id, req.body);
		res.status(200).json(updatedMovie);
	} catch (err) {
		res.status(500).json(err);
	}
};

const deleteMovie = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json("Access denied!");
		}
		await movieService.deleteMovieById(req.params.id);
		res.status(200).json("The movie has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};

const getMovieById = async (req, res) => {
	try {
		const movie = await movieService.getMovieById(req.params.id);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getRandomMovie = async (req, res) => {
	try {
		const type = req.query.type;
		const movie = await movieService.getRandomMovie(type);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getAllMovies = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json("Access denied!");
		}
		const movies = await movieService.getAllMovies();
		res.status(200).json(movies.reverse());
	} catch (err) {
		res.status(500).json(err);
	}
};

const getFilterMovie = async (req, res) => {
	try {
		const name = req.query.find;
		const movie = await movieService.findMovie(name);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
};


module.exports = {
	createMovie,
	updateMovie,
	deleteMovie,
	getMovieById,
	getRandomMovie,
	getAllMovies,
	getFilterMovie
};