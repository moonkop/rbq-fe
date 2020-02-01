import React from 'react'
import {api, HTTP_REQUEST_METHODS} from "../utils/request";
import {inject, observer} from "mobx-react";
import {Article} from "../types/Article";
import {RootStore} from "../stores";
import {Articles} from "../stores/Articles";
import "./Articles.scss";
import {converter} from "../utils/utils";

interface ArticleListProps {

}

interface ArticleListInjectedProps extends ArticleListProps {
	articles: Articles
}

@inject((stores: RootStore) => ({
	articles: stores.articles
}))
@observer
export class ArticleAdmin extends React.Component<ArticleListProps> {

	get injected() {
		return this.props as ArticleListInjectedProps;
	}

	componentDidMount() {
		this.injected.articles.loadArticleList();
	}

	renderCard = (article: Article) => {
		return <div className='article-card'>
			<div className="brief">
				{article.name}
				{article.modified}
				{article.created}
			</div>
			<div className='content' dangerouslySetInnerHTML={{__html: converter.makeHtml(article.content)}}>
			</div>
			<div className='actions'>
				<div className='action' onClick={() => {this.injected.articles.deleteArticle(article)}}>
					delete
				</div>
				<div className='action' onClick={this.injected.articles.goToView.bind(null, article)}>
					view
				</div>
				<div className='action' onClick={this.injected.articles.goToEdit.bind(null, article)}>
					edit
				</div>
			</div>
		</div>;

	}

	render() {
		return (
			<div className='articles article-admin'>
				<div>
					<button className='btn-new' onClick={()=>{this.injected.articles.newArticle()}}>
						new
					</button>
				</div>
				{
					this.injected.articles.list.map(this.renderCard)
				}

			</div>
		)


	}
}