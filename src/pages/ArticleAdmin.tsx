import React from 'react'
import {inject, observer} from "mobx-react";
import {Article} from "../types/Article";
import {RootStore} from "../stores";
import {Articles} from "../stores/Articles";
import "./Articles.scss";
import {converter} from "../utils/utils";
import dayjs from 'dayjs'
import {RouteComponentProps} from "react-router";
import {User} from "../stores/User";

interface ArticleListParams {
	tag: string;
}

interface ArticleListProps extends RouteComponentProps<ArticleListParams> {

}

interface ArticleListInjectedProps extends ArticleListProps {
	articles: Articles
	user: User
}

@inject((stores: RootStore) => ({
	articles: stores.articles,
	user: stores.user,
}))
@observer
export class ArticleAdmin extends React.Component<ArticleListProps> {

	get injected() {
		return this.props as ArticleListInjectedProps;
	}

	componentDidMount() {
		this.injected.articles.tag = this.props.match.params.tag;
		this.injected.articles.loadArticleList()
	}

	componentWillReceiveProps(nextProps: Readonly<ArticleListProps>, nextContext: any): void {
		if (this.props.match.params.tag !== nextProps.match.params.tag) {
			this.injected.articles.tag = nextProps.match.params.tag;
			this.injected.articles.loadArticleList();
		}
	}

	renderCard = (article: Article) => {
		return <div className="post animated fadeInDown" key={article.id}>
			<div className="post-title">
				<h3>
					<span className='link'
					      onClick={this.injected.articles.goToView.bind(null, article)}>
						{article.name}
					</span>
				</h3>
				{this.injected.user.isAdmin && <div className="btns">
                    <button className="btn" onClick={this.injected.articles.goToEdit.bind(null, article)}>edit</button>
                    <button className="btn" onClick={this.injected.articles.deleteArticle.bind(null, article)}>delete
                    </button>
                </div>}
			</div>
			<div className="post-content">
				<div className="p_part" dangerouslySetInnerHTML={{__html: converter.makeHtml(article.content)}}>
				</div>

				<div className="p_part"><p></p></div>
			</div>
			<div className="post-footer">
				<div className="meta">
					<div className="info"><i className="fa fa-sun-o"></i>
						<span className="date">{dayjs(article.created).format("YYYY-MM-DD")}</span>
						<i className="fa fa-comment-o"></i><a href="/post/2015-05-22#disqus_thread">Comments</a>
						<i className="fa fa-tag"></i>
						{article.tags && article.tags.map(tag => {
							return <span className="tag" key={tag}
							             onClick={this.injected.articles.loadByTag.bind(null, tag)}>
								&nbsp;{tag}</span>
						})}
					</div>
				</div>
			</div>
		</div>;

	}

	render() {
		return (
			<div className='article-admin'>
				<div className='main-btns'>
					{this.injected.user.isAdmin && <button className='btn btn-new animated fadeInDown' onClick={() => {
						this.injected.articles.newArticle()
					}}>
                        new
                    </button>}
				</div>
				{
					this.injected.articles.list.map(this.renderCard)
				}

			</div>
		)


	}
}