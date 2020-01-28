import React, {Fragment, useEffect} from 'react'
import {api, apiAsync, HTTP_REQUEST_METHODS} from "../utils/utils";
import {observer} from "mobx-react";
// @ts-ignore
import {ReactMde} from "react-mde";
import {Article} from "../types/Article";
import {getArticleManage, goToEdit} from "../features/ArticleManage";


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
			<button onClick={goToEdit.bind(null, article)}>
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
			name: 'newDraft' + index++
		}
	})
	await loadArticleList();
}

export async function loadArticleList() {
	getArticleManage().list = (await apiAsync({router: "/writer/drafts"})).payload.list;

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
export const ArticleListPage:React.FC=()=><div>
	<ArticleList>

	</ArticleList>
</div>
export const ArticleList: React.FC = observer(() => {
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
					getArticleManage().list.map(ArticleCard)
				}

			</Fragment>
		)
	}
)