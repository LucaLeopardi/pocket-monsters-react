import * as SQLite from 'expo-sqlite'
import CommunicationController from './CommunicationController';

export default class StorageManager {

	constructor() {
		this.db = SQLite.openDatabase("local.db");

		// !!! Tables fields names are hard-coded to be the same as the ones in the server, for easy insertion and replacement

		let createUsersTableQuery = {
			sql: "CREATE TABLE IF NOT EXISTS Users (\
					uid INTEGER PRIMARY KEY, \
					name TEXT, \
					lat DOUBLE, \
					lon DOUBLE, \
					life INTEGER, \
					experience INTEGER, \
					weapon INTEGER, \
					armor INTEGER, \
					amulet INTEGER, \
					picture TEXT, \
					profileversion INTEGER, \
					positionshare BOOL)",
			args: []
		}
		let createObjectsTableQuery = {
			sql: "CREATE TABLE IF NOT EXISTS Objects (\
					id INTEGER PRIMARY KEY,\
					type TEXT,\
					level INTEGER,\
					image TEXT,\
					name TEXT)",
			args: []
		}
		this.db.execAsync([createUsersTableQuery, createObjectsTableQuery], false).then(results => this.checkResultsAndReturn(results))
	}

	// UTILITY
	// Apparently execAsync does not throw errors, but returns them in the results array which needs to be checked
	checkResultsAndReturn(results) {
		for (let result of results) {
			if (result.error != undefined) { throw new Error("Error executing query: " + result.error) }
		}
		return results
	}

	////////////////////////
	//// DATABASE CALLS ////
	////////////////////////

	// USERS

	async addUser(uid, name, lat, lon) {
		let query = {
			sql: "INSERT INTO Users (uid, name, lat, lon) VALUES (?,?,?,?)",
			args: [uid, name, lat, lon]
		}
		this.db.execAsync([query], false).then(results => this.checkResultsAndReturn(results))
	}

	// !!! Replaces User data, deleting previous fields if not specified in user object argument
	async insertOrReplaceUser(user) {	// Takes an object to allow for named parameters

		const { uid, name = null, lat = null, lon = null, life = null, experience = null, weapon = null, armor = null, amulet = null, picture = null, profileversion = null, positionshare = null } = user

		let sql = "INSERT OR REPLACE INTO Users (uid, name, lat, lon,  life, experience, weapon, armor, amulet, picture, profileversion, positionshare) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"

		let args = [uid, name, lat, lon, life, experience, weapon, armor, amulet, picture, profileversion, positionshare]

		let query = { sql, args }
		this.db.execAsync([query], false).then(results => this.checkResultsAndReturn(results))
	}

	async getUserByID(sid, uid, profileversion) {
		let query = { sql: "SELECT * FROM Users WHERE uid = ?", args: [uid] }
		let results = await this.db.execAsync([query], true).then(results => this.checkResultsAndReturn(results))
		// console.log("Result from local DB:\n", results[0].rows[0])
		let user
		if (results[0].rows.length != 0) {
			user = results[0].rows[0]
			if (user.profileversion >= profileversion)	// Return user only if it's up to date
				return user
		}

		console.log("Up-to-date User not found in local DB, getting from server...")
		user = await CommunicationController.getUserDetails(sid, uid)
		// console.log("Result from server:\n", user)
		// INSERT to local DB is called, but the server's result is immediately returned for responsiveness
		this.insertOrReplaceUser(user)
		return user
	}


	// OBJECTS

	async addObject(object) {
		const { id, type, level, image = null, name } = object

		let query = {
			sql: "INSERT INTO Objects (id, type, level,  image, name) VALUES (?,?,?,?,?)",
			args: [id, type, level, image, name]
		}
		this.db.execAsync([query], false).then(results => this.checkResultsAndReturn(results))
	}

	async getObjectByID(sid, id) {
		let query = { sql: "SELECT * FROM Objects WHERE id = ?", args: [id] }
		let results = await this.db.execAsync([query], true).then(results => this.checkResultsAndReturn(results))
		// console.log("Result from local DB: ", results[0].rows[0])
		if (results[0].rows.length != 0) return results[0].rows[0]

		console.log("Object not found in local DB, getting from server...")
		let object = await CommunicationController.getObjectDetails(sid, id)
		console.log("Result from server: ", object)
		// INSERT to local DB is called, but the server's result is immediately returned for responsiveness
		this.addObject(object)
		return object
	}

}