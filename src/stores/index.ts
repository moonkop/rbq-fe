import {Articles, articles} from "./Articles";
import {Detail, detail} from "./Detail";

export const rootStore = {
	articles,
	edit: detail,
}
export interface RootStore {
	articles: Articles;
	edit: Detail;
}