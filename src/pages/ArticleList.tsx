import React, {Fragment} from 'react'
import {api, HTTP_REQUEST_METHODS} from "../utils/utils";
import {inject, observer} from "mobx-react";
// @ts-ignore
import {ReactMde} from "react-mde";
import {Article} from "../types/Article";
import {RootStore} from "../stores";
import {Articles} from "../stores/Articles";

interface ArticleListProps {

}
interface ArticleListInjectedProps extends ArticleListProps {
	articles: Articles
}

@inject((stores: RootStore) => ({
	articles: stores.articles
}))
@observer
export class ArticleList extends React.Component<ArticleListProps> {

	get injected() {
		return this.props as ArticleListInjectedProps;
	}

	componentDidMount() {
		this.injected.articles.loadArticleList();
	}

	renderCard(article: Article) {
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
							this.injected.articles.loadArticleList();
						}
					})
				}}>
					delete
				</button>
				<button>
					view../stores/ArticleManage
				</button>
				<button onClick={this.injected.articles.goToEdit.bind(null, article)}>
					edit
				</button>
			</div>
		</div>;

	}

	render() {
		return (
			<Fragment>
				<div>
					<button onClick={this.injected.articles.newArticle}>
						new
					</button>
				</div>
				{
					this.injected.articles.list.map(this.renderCard)
				}

			</Fragment>
		)


	}
}