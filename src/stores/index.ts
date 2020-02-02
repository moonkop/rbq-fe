import {Articles, articles} from "./Articles";
import {Detail, detail} from "./Detail";
import {user, User} from "./User";

export const rootStore = {
	articles,
	detail,
	user
}

export interface RootStore {
	user: User;
	articles: Articles;
	detail: Detail;
}