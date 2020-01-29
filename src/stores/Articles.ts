import {Article} from "../types/Article";
import {observable} from "mobx";
import {apiAsync, HTTP_REQUEST_METHODS} from "../utils/utils";
import {history} from "../history";

export class Articles {
	@observable list: Article[] = [];
	@observable currentEditArticle: Article = {id: '', content: '', name: '', comments: [], created: '', modified: ''}
	newIndex = 0;
	async goToEdit(article: Article) {
		history.push('/edit/' + article.id);
		articles.currentEditArticle = article;
	}

	async newArticle() {
		await apiAsync({
			router: "/writer/draft/new",
			method: HTTP_REQUEST_METHODS.POST,
			body: {
				name: 'newDraft' + this.newIndex++
			}
		})
		await this.loadArticleList();
	}

	async loadArticleList() {
		try {
			articles.list = (await apiAsync({router: "/writer/drafts"})).payload.list;
		} catch (e) {
			console.log(e)
		}
	}

	authAsAdmin() {
		return apiAsync({
			router: "/user/adminLogin",
			method: HTTP_REQUEST_METHODS.POST,
			body: {
				password: '123'
			}
		})
	}

	async loadEditContentById(name: string) {
	}

	async goToView(article: Article) {

	}
}

export const articles: Articles = new Articles();


