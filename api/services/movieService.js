const Movie = require('../models/Movie');

const createMovie = async (movieData) => {
	const newMovie = new Movie(movieData);
	const savedMovie = await newMovie.save();
	return savedMovie;
};

const updateMovieById = async (movieId, movieData) => {
	const updatedMovie = await Movie.findByIdAndUpdate(
		movieId,
		movieData,
		{ new: true }
	);
	return updatedMovie;
};

const deleteMovieById = async (movieId) => {
	await Movie.findByIdAndDelete(movieId);
};

const getMovieById = async (movieId) => {
	const movie = await Movie.findById(movieId);
	return movie;
};

const getRandomMovie = async (type) => {
	const matchQuery = type === "series" ? { isSeries: true } : { isSeries: false };
	const movie = await Movie.aggregate([{ $match: matchQuery }, { $sample: { size: 1 } }]);
	return movie;
};

const getAllMovies = async () => {
	const movies = await Movie.find();
	return movies;
};
const findMovie = async (searchTerm) => {
	try {
		const regex = new RegExp(searchTerm, 'i');
		const movies = await Movie.find({
			$or: [
				{ title: { $regex: regex } },
				{ desc: { $regex: regex } }
			]
		});

		return movies;
	} catch (error) {
		console.error(error);
		throw new Error('Произошла ошибка при поиске фильмов');
	}
}
module.exports = {
	createMovie,
	updateMovieById,
	deleteMovieById,
	getMovieById,
	getRandomMovie,
	getAllMovies,
	findMovie
};
