import * as SQLite from 'expo-sqlite';

export default class StorageManager {

	constructor() {
		this.db = SQLite.openDatabase("testDB");

		let createUsersTableQuery = {
			sql: "CREATE TABLE IF NOT EXISTS Users (\
					uid INTEGER PRIMARY KEY, \
					name TEXT, \
					lat DOUBLE, \
					lon DOUBLE, \
					timestamp TEXT, \
					hp INTEGER, \
					xp INTEGER, \
					weaponID INTEGER, \
					armorID INTEGER, \
					amuletID INTEGER, \
					image TEXT, \
					profileVersion INTEGER, \
					positionSharing BOOL)",
			args: []
		}
		let createObjectsTableQuery = {
			sql: "CREATE TABLE IF NOT EXISTS Objects (\
					id INTEGER PRIMARY KEY,\
					type TEXT,\
					level INTEGER,\
					lat DOUBLE,\
					lon DOUBLE,\
					image TEXT,\
					name TEXT)",
			args: []
		}
		this.db.execAsync([createUsersTableQuery, createObjectsTableQuery], false).then(results => this.checkResultsAndReturn(results))
	}

	// Utility functions

	// Apparently execAsync does not throw errors, but returns them in the results array which needs to be checked
	checkResultsAndReturn(results) {
		for (let result of results) {
			if (result.error != undefined) { throw new Error("Error executing query: " + result.error) }
		}
		return results
	}


	// Users

	async addUser(uid, name, lat, lon) {
		let query = {
			sql: "INSERT INTO Users (uid, name, lat, lon) VALUES (?,?,?,?)",
			args: [uid, name, lat, lon]
		}
		this.db.execAsync([query], false).then(results => this.checkResultsAndReturn(results))
	}

	async updateUser(uid, name = null, image = null, positionSharing = null) {
		let sql = "UPDATE Users SET ";
		let args = [];
		let params = [];

		if (name !== null) {
			params.push("name = ?");
			args.push(name);
		}

		if (image !== null) {
			params.push("image = ?");
			args.push(image);
		}

		if (positionSharing !== null) {
			params.push("positionSharing = ?");
			args.push(positionSharing);
		}

		sql += params.join(", ") + " WHERE uid = ?";
		args.push(uid);

		let query = { sql, args };
		this.db.execAsync([query], false).then(results => this.checkResultsAndReturn(results));
	}

	async getAllUsers() {
		let query = { sql: "SELECT * FROM Users", args: [] }
		let results = await (this.db.execAsync([query], true).then(results => this.checkResultsAndReturn(results)))
		return results[0].rows
	}

	async getUserByID(uid) {
		let query = { sql: "SELECT * FROM Users WHERE uid = ?", args: [uid] }
		let results = await this.db.execAsync([query], true)
		return results[0].rows
	}


	// Objects

	async addObject(id, type, level, lat, lon, image, name) {
		let query = {
			sql: "INSERT INTO Objects (id, type, level, lat, lon, image, name) VALUES (?,?,?,?,?,?,?)",
			args: [id, type, level, lat, lon, image, name]
		}
		this.db.execAsync([query], false).then(results => this.checkResultsAndReturn(results))
	}

	async getAllObjects() {
		let query = { sql: "SELECT * FROM Objects", args: [] }
		let results = await (this.db.execAsync([query], true).then(results => this.checkResultsAndReturn(results)))
		return results[0].rows
	}

	async getObjectByID(id) {
		let query = { sql: "SELECT * FROM Objects WHERE id = ?", args: [id] }
		let results = await this.db.execAsync([query], true)
		return results[0].rows
	}
}