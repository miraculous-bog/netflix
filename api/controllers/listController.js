const listService = require('../services/listService');

const createList = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json("You are not allowed!");
		}
		const newList = req.body;
		const savedList = await listService.createList(newList);
		res.status(201).json(savedList);
	} catch (err) {
		res.status(500).json(err);
	}
};

const deleteList = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json("You are not allowed!");
		}
		await listService.deleteListById(req.params.id);
		res.status(200).json("The list has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};

const getList = async (req, res) => {
	const { type, genre } = req.query;
	try {
		let list;
		if (type) {
			if (genre) {
				list = await listService.getListByTypeAndGenre(type, genre);
			} else {
				list = await listService.getListByType(type);
			}
		} else {
			list = await listService.getRandomList();
		}
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	createList,
	deleteList,
	getList
};
