import React, {Fragment, useEffect} from 'react'
import {api, apiAsync, HTTP_REQUEST_METHODS} from "../utils/utils";
import {observable} from "mobx";
import {observer} from "mobx-react";

class ArticleList {
	@observable list: Array<Article> = [];
}

const articleList: ArticleList = new ArticleList();

interface Article {
	name: string,
	content: string,
	modified: string,
	created: string,
	comments: Array<Comment>,
}

interface Comment {
	created: string,
	content: string,
	author: string,
}

export function ArticleCard(article: Article) {
	return <div className='article-card'>
		<div className='content'>
			{article.name}
			{article.content}
			{article.modified}
			{article.created}

		</div>
		<div className='actions'>
			<button onClick={() => {
				api({
					router: `/writer/draft/${article.name.replace('.md', '')}`,
					method: HTTP_REQUEST_METHODS.DELETE,
					callback: () => {
						loadArticleList();
					}
				})
			}}>
				delete
			</button>
			<button>
				view
			</button>
			<button>
				edit
			</button>
		</div>
	</div>;
}

let index = 0;
export async function newArticle() {
	await apiAsync({
		router: "/writer/draft/new",
		method: HTTP_REQUEST_METHODS.POST,
		body: {
			name:'newDraft'+index++
		}
	})
	await loadArticleList();
}

export async function loadArticleList() {
	articleList.list = (await apiAsync({router: "/writer/drafts"})).payload.list;

}

export function authAsAdmin() {
	return apiAsync({
		router: "/user/adminLogin",
		method: HTTP_REQUEST_METHODS.POST,
		body: {
			password: '123'
		}
	})
}

export const Home: React.FC = observer(() => {
		useEffect(() => {
			loadArticleList();
		}, [])
		return (
			<Fragment>
				<div>
					<button onClick={newArticle}>
						new
					</button>
				</div>
				{
					articleList.list.map(ArticleCard)
				}

			</Fragment>
		)
	}
)