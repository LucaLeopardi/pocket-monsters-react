export default class CommunicationController {
	static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/mostri/";

	static async request(endpoint, verb, queryParams, bodyParams) {
		const queryParamsString = new URLSearchParams(queryParams).toString();
		console.log("Sending " + verb + " request to " + this.BASE_URL + endpoint + "?" + queryParamsString);

		let fetchData = {
			method: verb,
			headers: {
				"Content-Type": "application/json"
			}
		};
		if (verb != "GET") fetchData.body = JSON.stringify(bodyParams)

		let httpResponse
		try {
			httpResponse = await fetch(this.BASE_URL + endpoint + "?" + queryParamsString, fetchData)
			if (!httpResponse.ok) throw new Error(`HTTP error! status: ${httpResponse.status}`)
		} catch (error) {
			throw new Error("NETWORK ERROR: " + error.message)
		}
		const status = httpResponse.status;
		if (status == 200) return await httpResponse.json();
		else throw new Error("SERVER ERROR: " + status + " - " + await httpResponse.text());
	}

	static async registerUser() { return await this.request("users", "POST", {}, {}) }

	static async getObjectsNearby(sid, lat, lon) { return await this.request("objects", "GET", { sid, lat, lon }, {}); }

	static async getObjectDetails(sid, id) { return await this.request("objects/" + id, "GET", { sid }, {}); }

	static async activateObject(sid, id) { return await this.request("objects/" + id + "/activate", "POST", {}, { sid }); }

	static async getUsersNearby(sid, lat, lon) { return await this.request("users", "GET", { sid, lat, lon }, {}); }

	static async getUserDetails(sid, uid) { return await this.request("users/" + uid, "GET", { sid }, {}); }

	static async updateUser(sid, uid, newName, newImage, newSharingPosition) { return await this.request("users/" + uid, "PATCH", {}, { sid: sid, name: newName, picture: newImage, positionshare: newSharingPosition }); }

	static async getRanking(sid) { return await this.request("ranking", "GET", { sid }, {}); }
}