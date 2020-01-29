import {Articles, articles} from "./Articles";
import {Edit, edit} from "./Edit";

export const rootStore = {
	articles,
	edit,
}
export interface RootStore {
	articles: Articles;
	edit: Edit;
}