import {apiAsync, HTTP_REQUEST_METHODS} from "../utils/request";
import {observable} from "mobx";

export class User {
	@observable name: string = ""
	@observable isAdmin: boolean = false;

	async login(who: string) {
		let payload = (await apiAsync({
			route: '/user/login',
			method: HTTP_REQUEST_METHODS.POST,
			body: {name: who}
		})).payload;
		this.isAdmin = payload.isAdmin;
		this.name = payload.name;
	}

	async getLoginUser() {
		let payload = (await apiAsync({route: '/user/info'})).payload;
		user.name = payload.name;
		user.isAdmin = payload.isAdmin;
	}
}

export const user = new User();