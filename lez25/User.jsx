export default class User {

	constructor(uid, name, currentHP, maxHP, xp, lat, lon) {
		this.uid = uid;
		this.name = name;
		this.currentHP = currentHP;
		this.maxHP = maxHP;
		this.xp = xp;
		this.lat = lat;
		this.lon = lon;
	}
}