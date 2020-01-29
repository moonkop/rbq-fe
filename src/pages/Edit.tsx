import React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {inject, observer} from "mobx-react";
import {history} from "../history";

import {Converter} from "showdown";
import {Article} from "../types/Article";
import {RootStore} from "../stores";
import {Edit as IEdit} from "../stores/Edit";
import {RouteComponentProps} from "react-router";

const converter = new Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true
})


declare type ReactMdeTabType = ("write" | "preview")

interface EditParams {
	id: string;
}

interface EditProps extends RouteComponentProps<EditParams> {
	article: Article;
}

interface EditInjectedProps extends EditProps {
	edit: IEdit;
}

interface EditStates {
	tab: ReactMdeTabType,
}

@inject((rootStore: RootStore) => ({
	edit: rootStore.edit
}))
@observer
export class Edit extends React.Component<EditProps, EditStates> {
	state = {
		tab: "write" as ReactMdeTabType,
	}

	get injected() {
		return this.props as EditInjectedProps
	}

	componentDidMount() {
		this.injected.edit.loadEdit(this.props.match.params.id);
	}

	componentDidUpdate(prevProps: Readonly<EditProps>, prevState: Readonly<EditStates>, snapshot?: any): void {
	}

	changeTab = (tab: ReactMdeTabType) => {
		this.setState({tab})
	}

	render() {
		console.log("Edit rendered", this);
		const {edit} = this.injected;

		return <div>
			<div>
				<input type="text" value={edit.article.name} onChange={(e) => {
					edit.article.name = e.currentTarget.value;
				}}/>
			</div>
			<ReactMde
				onChange={(mde) => {
					edit.article.content = mde;
				}}
				onTabChange={(tab) => {
					this.changeTab(tab);
				}}
				selectedTab={this.state.tab}
				value={edit.article.content}
				generateMarkdownPreview={(content) => {
					return Promise.resolve(converter.makeHtml(content))
				}}
			>

			</ReactMde>
			<button onClick={() => {
				console.log(history);
				this.injected.edit.save();
			}}>
				save
			</button>
		</div>;
	}
}