export default class CommunicationController {
	static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/mostri/";

	static async request(endpoint, verb, queryParams, bodyParams) {
		const queryParamsString = new URLSearchParams(queryParams).toString();
		console.log("Sendind " + verb + " request to " + this.BASE_URL + endpoint + "?" + queryParamsString);

		let fetchData = {
			method: verb,
			headers: {
				"Content-Type": "application/json"
			}
		};
		if (verb != "GET") fetchData.body = JSON.stringify(bodyParams);

		let httpResponse = await fetch(this.BASE_URL + endpoint + "?" + queryParamsString, fetchData);
		const status = httpResponse.status;
		if (status == 200) return await httpResponse.json();
		else throw new Error("SERVER ERROR: " + status + " - " + httpResponse.text());
	}

	static async getRanking(sid) { return await this.request("ranking", "GET", { sid: sid }, {}); }
}