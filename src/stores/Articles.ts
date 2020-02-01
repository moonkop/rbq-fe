import {Article} from "../types/Article";
import {observable} from "mobx";
import {api, apiAsync, HTTP_REQUEST_METHODS} from "../utils/request";
import {history} from "../history";

export class Articles {
	@observable list: Article[] = [];
	@observable currentEditArticle: Article = {id: '', content: '', name: '', comments: [], created: '', modified: ''}
	newIndex = 0;


	async loadArticleList() {
		try {
			articles.list = (await apiAsync({router: "/writer/drafts"})).payload.list;
		} catch (e) {
			console.log(e)
		}
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


	deleteArticle(article: Article) {
		api({
			router: `/writer/draft/${article.id}`,
			method: HTTP_REQUEST_METHODS.DELETE,
			callback: () => {
				articles.loadArticleList();
			}
		})
	}


	async goToEdit(article: Article) {
		history.push('/edit/' + article.id);
		articles.currentEditArticle = article;
	}
	async goToView(article: Article) {

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
}

export const articles: Articles = new Articles();


