import * as SQLite from 'expo-sqlite';

export default class StorageManager {

	constructor() {
		this.db = SQLite.openDatabase("testDB");
		this.db.transaction(
			tx => {
				tx.executeSql("CREATE TABLE IF NOT EXISTS Users (\
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
					[],
					() => console.log("Table Users created: "),
					(_, error) => { throw new Error("Error creating table Users: " + error) })

				tx.executeSql("CREATE TABLE IF NOT EXISTS Objects (\
									id INTEGER PRIMARY KEY,\
									type TEXT,\
									level INTEGER,\
									lat DOUBLE,\
									lon DOUBLE,\
									image TEXT,\
									name TEXT)",
					[],
					() => console.log("Table Objects created"),
					(_, error) => { throw new Error("Error creating table Objects: " + error) })
			},
			(_, error) => { throw new Error("Error initializing database: " + error) },
			() => console.log("Database initialization finished (successfully or not)")
		)
	}

	// Utility functions

	checkResultAndReturn(results) {
		for (let result of results) {
			if (result.error != undefined) { throw new Error("Error executing query: " + result.error) }
		}
		return results
	}

	// Users

	async addUser(uid, name, lat, lon) {
		let query = { sql: "INSERT INTO Users (uid, name, lat, lon) VALUES (?,?,?,?)", args: [uid, name, lat, lon] }
		this.db.execAsync([query], false).then(results => this.checkResultAndReturn(results))
	}

	async getAllUsers() {
		let query = { sql: "SELECT * FROM Users", args: [] }
		let results = await (this.db.execAsync([query], true).then(results => this.checkResultAndReturn(results)))
		return results[0].rows
	}

	async getUserByID(uid) {
		let query = { sql: "SELECT * FROM Users WHERE uid = ?", args: [uid] }
		let results = await this.db.execAsync([query], true)
		return results[0].rows
	}
}