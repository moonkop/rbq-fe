import {Article} from "../types/Article";
import {apiAsync} from "../utils/utils";

class Edit {
	article: Article = {} as any

	async loadEdit(id:string) {
		edit.article = (await apiAsync({router: `/writer/draft/${id}`})).payload as Article;
	}
}

export const edit = new Edit();