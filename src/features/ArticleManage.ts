import {Article} from "../types/Article";
import {observable} from "mobx";
import {apiAsync} from "../utils/utils";
import {history} from "../history";

export class ArticleManage {
	@observable list: Array<Article> = [];
	@observable currentEditArticle: Article = {content: '', name: '', comments: [], created: '', modified: ''}
}

const articleManage: ArticleManage = new ArticleManage();
export const getArticleManage = () => articleManage;

export async function goToEdit(article: Article) {
	history.push('/edit/'+article.name);
	articleManage.currentEditArticle = article;
}

export async function loadEditContentByName(name:string) {
	articleManage.currentEditArticle = (await apiAsync({router: `/writer/draft/${name}`})).payload as Article;
}

export function goToView(article: Article) {

}