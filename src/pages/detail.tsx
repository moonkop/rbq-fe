import React from "react";
import {RootStore} from "../stores";
import { inject, observer } from "mobx-react";
import {RouteComponentProps} from "react-router";
import {converter} from "../utils/utils";
import {Article} from "../types/Article";

interface DetailParams{
	id:string
}

interface DetailProps{

}

interface DetailInjectedProps extends RouteComponentProps<DetailParams>,DetailProps {
	article: Article;
}


@inject((stores: RootStore,prop:DetailInjectedProps) => {
	return {
			article:stores.articles.articleDict[prop.match.params.id]
	}
})
@observer
export class Detail extends React.Component<DetailProps, {}> {
	get injected(){
		return this.props as DetailInjectedProps;
	}

	render() {
		return <div>
			<div className="p_part" dangerouslySetInnerHTML={{__html: converter.makeHtml(this.injected.article.content)}}>
			</div>
		</div>
	}
}