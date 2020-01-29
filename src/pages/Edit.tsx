import React, {useEffect, useState} from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {observer} from "mobx-react";
import {Articles, getArticleManage, loadEditContentById} from "../stores/ArticleManage";
import {apiAsync, DEFAULT_HOST, HTTP_REQUEST_METHODS} from "../utils/utils";
import {history} from "../history";
import {useParams} from 'react-router-dom'

import {Converter} from "showdown";
import {Article} from "../types/Article";

const converter = new Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true
})

interface EditProps {

}

export const EditPage: React.FC = () => {
	return <div>
		<Edit article={getArticleManage().currentEditArticle}/>
	</div>
}
export const Edit1 = observer(
	() => {
		let ws: WebSocket;
		let {id} = useParams();
		let article = getArticleManage().currentEditArticle;
		let [tab, changeTab] = useState<("write" | "preview")>("write");
		let [content, _changeContent] = useState(article.content);
		let [name, changeName] = useState(article.name)
		useEffect(() => {
			_changeContent(article.content);
			changeName(article.name);
			loadEditContentById(id as string);
		}, [article.content, id, name])
		useEffect(() => {
			ws = new WebSocket(`ws://${DEFAULT_HOST}/writer/ws`);
			ws.onopen = () => {

			}
		}, [])
		const changeContent = (input: string) => {
			_changeContent(input)
			ws.send(JSON.stringify({id: article.id, type: 'POST_CONTENT', content: input}))
		}
		return;
	}
)
declare type ReactMdeTabType = ("write" | "preview")
interface EditProps {
	article: Article;
}
interface EditStates {
	tab:ReactMdeTabType,
	content:string,
	name:string,
}
@observer
export class Edit extends React.Component<EditProps, EditStates> {
	state = {
		tab: "write" as ReactMdeTabType,
		content: '',
		name: ''
	}

	componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {

	}

	changeName = (name:string) => {
		this.setState({name})

	}
	changeTab = (tab:ReactMdeTabType) => {
		this.setState({tab})

	}
	changeContent = () => {

	}

	render() {
		return <div>
			<div>
				<input type="text" value={this.state.name} onChange={(e) => {
					this.changeName(e.currentTarget.value);
				}}/>
			</div>
			<ReactMde
				onChange={this.changeContent}
				onTabChange={(tab) => {
					this.changeTab(tab);
				}}
				selectedTab={this.state.tab}
				value={this.state.content}
				generateMarkdownPreview={(content) => {
					return Promise.resolve(converter.makeHtml(content))
				}}
			>

			</ReactMde>
			<button onClick={() => {
				console.log(history);
				apiAsync({
					router: `/writer/draft/${this.props.article.id}`,
					method: HTTP_REQUEST_METHODS.PATCH,
					body: {
						name: this.props.article.id,
						content: this.props.article.content
					}
				})
			}}>
				save
			</button>
		</div>;
	}
}