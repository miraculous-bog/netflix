const List = require('../models/List');

const createList = async (listData) => {
	const newList = new List(listData);
	return newList.save();
};

const deleteListById = async (listId) => {
	return List.findByIdAndDelete(listId);
};

const getListByTypeAndGenre = async (type, genre) => {
	return List.aggregate([
		{ $match: { type, genre } },
		{ $sample: { size: 10 } }
	]);
};

const getListByType = async (type) => {
	return List.aggregate([
		{ $match: { type } },
		{ $sample: { size: 10 } }
	]);
};

const getRandomList = async () => {
	return List.aggregate([{ $sample: { size: 10 } }]);
};

module.exports = {
	createList,
	deleteListById,
	getListByTypeAndGenre,
	getListByType,
	getRandomList
};
