const userService = require('../services/userService');
const CryptoJS = require("crypto-js");
const Movie = require('../models/Movie');

const updateUser = async (req, res) => {
	const { id, isAdmin } = req.user;
	const { id: userId } = req.params;

	if (id === userId || isAdmin) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await userService.updateUserById(userId, req.body);
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account!");
	}
};

const deleteUser = async (req, res) => {
	const { id, isAdmin } = req.user;
	const { id: userId } = req.params;

	if (id === userId || isAdmin) {
		try {
			await userService.deleteUserById(userId);
			res.status(200).json("User has been deleted...");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can delete only your account!");
	}
};

const getUserById = async (req, res) => {
	console.log('workd');
	try {
		const user = await userService.getUserById(req.params.id);
		console.log(user);
		const { password, ...info } = user._doc;
		res.status(200).json(info);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getAllUsers = async (req, res) => {
	const query = req.query.new;
	if (req.user.isAdmin) {
		try {
			const users = query ? await userService.getNewUsers() : await userService.getAllUsers();
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed to see all users!");
	}
};

const getUserStats = async (req, res) => {
	const today = new Date();
	const lastYear = today.setFullYear(today.getFullYear() - 1);

	try {
		const data = await userService.getUserStats(lastYear);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
};

const addListItem = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;
	try {
		// Поиск фильма в коллекции Movie по его ID
		const movie = await Movie.findById(id);

		if (!movie) {
			return res.status(404).json({ message: 'Фильм не найден' });
		}

		// Поиск пользователя в коллекции User по его ID
		const user = await userService.getUserById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Проверка, есть ли фильм уже в списке пользователя
		const isMovieInList = user.list.includes(movie._id);

		if (isMovieInList) {
			return res.status(400).json({ message: 'Фильм уже добавлен в список пользователя' });
		}

		// Добавление фильма в список пользователя
		user.list.push(movie._id);

		// Сохранение изменений в базе данных

		await userService.updateUserById(userId, user);
		res.status(200).json({ message: 'Фильм успешно добавлен в список пользователя' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Произошла ошибка сервера' });
	}
}

const deleteListItem = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	try {
		// Поиск фильма в коллекции Movie по его ID
		const movie = await Movie.findById(id);

		if (!movie) {
			return res.status(404).json({ message: 'Фильм не найден' });
		}

		// Поиск пользователя в коллекции User по его ID
		const user = await userService.getUserById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const movieIndex = user.list.findIndex((listItem) => listItem.toString() === movie._id.toString());

		if (movieIndex === -1) {
			return res.status(400).json({ message: 'Фильм не найден в списке пользователя' });
		}

		user.list.splice(movieIndex, 1);

		await userService.updateUserById(userId, user);

		res.status(200).json({ message: 'Фильм успешно удален из списка пользователя' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Произошла ошибка сервера' });
	}
};


module.exports = {
	updateUser,
	deleteUser,
	getUserById,
	getAllUsers,
	getUserStats,
	addListItem,
	deleteListItem
};
