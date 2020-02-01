import {Article} from "../types/Article";
import {apiAsync, HTTP_REQUEST_METHODS} from "../utils/request";
import {observable} from "mobx";

export class Detail {
	@observable article: Article = {name: '', id: '', content: '', modified: '', created: "", comments: []}

	async save() {
		await apiAsync({
			router: `/writer/draft/${detail.article.id}`,
			method: HTTP_REQUEST_METHODS.PATCH,
			body: {
				id: detail.article.id,
				name: detail.article.name,
				content: detail.article.content
			}
		})
	};

	async loadEdit(id: string) {
		detail.article = (await apiAsync({router: `/writer/draft/${id}`})).payload as Article;
	}
}

export const detail = new Detail();