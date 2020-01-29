import {Article} from "../types/Article";
import {apiAsync, HTTP_REQUEST_METHODS} from "../utils/utils";
import {observable} from "mobx";

export class Edit {
	@observable article: Article = {name: '', id: '', content: '', modified: '', created: "", comments: []}

	async save() {
		await apiAsync({
			router: `/writer/draft/${edit.article.id}`,
			method: HTTP_REQUEST_METHODS.PATCH,
			body: {
				name: edit.article.id,
				content: edit.article.content
			}
		})
	};

	async loadEdit(id: string) {
		edit.article = (await apiAsync({router: `/writer/draft/${id}`})).payload as Article;
	}
}

export const edit = new Edit();