import { Article } from "../types/Article";
import { observable } from "mobx";
import { api, apiAsync, HTTP_REQUEST_METHODS } from "../utils/request";
import {history, navigateTo} from "../history";
import { websocketStore } from "./Websocket";
import {Dict} from "../types/common";

export class Articles {
	@observable articleDict: Dict<Article> = {};
	@observable articleIds:string[] =[];
	@observable currentDetailArticleId:string = '';
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
			let list: Article[] = (await apiAsync({route: route})).payload.list;
			articles.articleDict = list.reduce((prev:Articles['articleDict'],next:Article)=>{
				prev[next.id]=next;
				return prev
			},{});
			articles.articleIds = list.map(item => item.id);

			websocketStore.sendMessage('subscribe',{  ids: Object.values(articles.articleDict).map(item => item.id) })
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
		navigateTo('/detail/' + article.id);
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

	getArticleList(): Article[] {
		return articles.articleIds.map(item => articles.articleDict[item]);
	}
}

export const articles: Articles = new Articles();


