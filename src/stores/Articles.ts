import { Article } from "../types/Article";
import { observable } from "mobx";
import { api, apiAsync, HTTP_REQUEST_METHODS } from "../utils/request";
import { history } from "../history";
import { websocketStore } from "./websocket1";

export class Articles {
	@observable list: Article[] = [];
	@observable currentEditArticle: Article = {
		id: '',
		content: '',
		name: '',
		comments: [],
		created: '',
		modified: '',
		tags: []
	}
	newIndex = 0;
	tag: string | null = null;
	async loadArticleList() {
		let route = "/articles";
		if (this.tag) {
			route = `/tags/${this.tag}`;
		}
		try {
			articles.list = (await apiAsync({ route: route })).payload.list;
			websocketStore.sendMessage('subscribe',{  ids: articles.list.map(item => item.id) })
		} catch (e) {
			console.log(e)
		}
	}

	async newArticle() {
		await apiAsync({
			route: "/articles/new",
			method: HTTP_REQUEST_METHODS.POST,
			body: {
				name: 'newDraft' + articles.newIndex++
			}
		})
		await articles.loadArticleList();
	}


	deleteArticle(article: Article) {
		api({
			route: `/article/${article.id}`,
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
			route: "/user/adminLogin",
			method: HTTP_REQUEST_METHODS.POST,
			body: {
				password: '123'
			}
		})
	}

	loadByTag(tag: string) {
		history.push('/tags/' + tag);
	}
}

export const articles: Articles = new Articles();


