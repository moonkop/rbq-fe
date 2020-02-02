import {Article} from "../types/Article";
import {apiAsync, HTTP_REQUEST_METHODS} from "../utils/request";
import {observable} from "mobx";

export class Detail {
	@observable article: Article = {name: '', id: '', content: '', modified: '', created: "", comments: [],tags:[]}

	async save() {
		await apiAsync({
			route: `/writer/draft/${detail.article.id}`,
			method: HTTP_REQUEST_METHODS.PATCH,
			body:detail.article
		})
	};

	async loadEdit(id: string) {
		detail.article = (await apiAsync({route: `/writer/draft/${id}`})).payload as Article;
	}
}

export const detail = new Detail();