import React, {useEffect, useState} from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {observer} from "mobx-react";
import {getArticleManage, loadEditContentById} from "../features/ArticleManage";
import {apiAsync, DEFAULT_HOST, HTTP_REQUEST_METHODS} from "../utils/utils";
import {history} from "../history";
import {useParams} from 'react-router-dom'

import {Converter} from "showdown";

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
		<Edit/>
	</div>
}
export const Edit: React.FC<EditProps> = observer(
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
		const changeContent = (input:string) => {
			_changeContent(input)
			ws.send(JSON.stringify({id: article.id, type: 'POST_CONTENT', content: input}))
		}
		return <div>
			<div>
				<input type="text" value={name} onChange={(e) => {
					changeName(e.currentTarget.value);
				}}/>
			</div>
			<ReactMde
				onChange={changeContent}
				onTabChange={(tab) => {
					changeTab(tab);
				}}
				selectedTab={tab}
				value={content}
				generateMarkdownPreview={(content) => {
					return Promise.resolve(converter.makeHtml(content))
				}}
			>

			</ReactMde>
			<button onClick={() => {
				console.log(history);
				apiAsync({
					router: `/writer/draft/${id}`,
					method: HTTP_REQUEST_METHODS.PATCH,
					body: {
						name: id,
						content: content
					}
				})
			}}>
				save
			</button>
		</div>;
	}
)