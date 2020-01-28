import React, {useEffect, useState} from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {observer} from "mobx-react";
import {getArticleManage, loadEditContentByName} from "../features/ArticleManage";
import {apiAsync, HTTP_REQUEST_METHODS} from "../utils/utils";
import {history} from "../history";
import {useParams} from 'react-router-dom'

interface EditProps {

}

export const EditPage: React.FC = () => {
	return <div>
		<Edit/>
	</div>
}
export const Edit: React.FC<EditProps> = observer(
	() => {
		let {name} = useParams();
		let [tab, changeTab] = useState<("write" | "preview")>("write");
		let staticContent = getArticleManage().currentEditArticle.content;
		let [content, ChangeContent] = useState(staticContent);
		useEffect(() => {
			ChangeContent(staticContent);
			loadEditContentByName(name as string);
		}, [staticContent,name])
		return <div>
			<div>
				<input type="text" value={name}/>
			</div>
			<ReactMde
				onChange={input =>
					ChangeContent(input)
				}
				onTabChange={(tab) => {
					changeTab(tab);
				}}
				selectedTab={tab}
				value={content}
			>

			</ReactMde>
			<button onClick={() => {
				console.log(history);
				apiAsync({
					router: `/writer/draft/${name}`,
					method: HTTP_REQUEST_METHODS.PATCH,
					body: {
						name: name,
						content: content
					}
				})
			}}>
				save
			</button>
		</div>;
	}
)