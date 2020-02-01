import React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {inject, observer} from "mobx-react";
import {history} from "../history";
import {Article} from "../types/Article";
import {RootStore} from "../stores";
import {Detail as IEdit} from "../stores/Detail";
import {RouteComponentProps} from "react-router";
import {converter} from "../utils/utils";


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
	preview: string,
}

@inject((rootStore: RootStore) => ({
	edit: rootStore.edit
}))
@observer
export class Edit extends React.Component<EditProps, EditStates> {
	state = {
		tab: "write" as ReactMdeTabType,
		preview: ''
	}

	get injected() {
		return this.props as EditInjectedProps
	}

	async componentDidMount() {
		await this.injected.edit.loadEdit(this.props.match.params.id);
		this.onGeneratePreview(this.injected.edit.article.content);
	}

	componentDidUpdate(prevProps: Readonly<EditProps>, prevState: Readonly<EditStates>, snapshot?: any): void {
	}

	changeTab = (tab: ReactMdeTabType) => {
		this.setState({tab})
	}
	onGeneratePreview = (preview: string) => {
		let html = converter.makeHtml(preview);
		this.setState({preview: html})
		return html;
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
				onChange={(content) => {
					edit.article.content = content;
					this.onGeneratePreview(content)
				}}
				onTabChange={(tab) => {
					this.changeTab(tab);
				}}
				selectedTab={this.state.tab}
				value={edit.article.content}
				generateMarkdownPreview={(content) => {
					return Promise.resolve(this.state.preview)
				}}
				disablePreview={true}
			>
			</ReactMde>

			<button onClick={() => {
				console.log(history);
				this.injected.edit.save();
			}}>
				save
			</button>
			<div dangerouslySetInnerHTML={{__html: this.state.preview}}></div>
		</div>;
	}
}