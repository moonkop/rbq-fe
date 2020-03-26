import React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { inject, observer } from "mobx-react";
import { history } from "../history";
import { Article } from "../types/Article";
import { RootStore } from "../stores";
import { Detail } from "../stores/Detail";
import { RouteComponentProps } from "react-router";
import { converter } from "../utils/utils";
import { websocketStore } from "../stores/websocket1";


declare type ReactMdeTabType = ("write" | "preview")

interface EditParams {
	id: string;
}

interface EditProps extends RouteComponentProps<EditParams> {
	article: Article;
}

interface EditInjectedProps extends EditProps {
	detail: Detail;
}

interface EditStates {
	tab: ReactMdeTabType,
	preview: string,
}

@inject((rootStore: RootStore) => ({
	detail: rootStore.detail
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
		await this.injected.detail.loadEdit(this.props.match.params.id);
		this.onGeneratePreview(this.injected.detail.article.content);

	}

	componentDidUpdate(prevProps: Readonly<EditProps>, prevState: Readonly<EditStates>, snapshot?: any): void {
	}

	changeTab = (tab: ReactMdeTabType) => {
		this.setState({ tab })
	}
	onGeneratePreview = (preview: string) => {
		websocketStore.sendMessage('stage',{  content: preview, id: this.injected.detail.article.id })
		let html = converter.makeHtml(preview);
		this.setState({ preview: html })
		return html;
	}

	render() {
		console.log("Edit rendered", this);
		const { detail } = this.injected;

		return <div>
			<div>
				<input type="text" value={detail.article.name} onChange={(e) => {
					detail.article.name = e.currentTarget.value;
				}} />
			</div>
			<ReactMde
				onChange={(content) => {
					detail.article.content = content;
					this.onGeneratePreview(content)
				}}
				onTabChange={(tab) => {
					this.changeTab(tab);
				}}
				selectedTab={this.state.tab}
				value={detail.article.content}
				generateMarkdownPreview={(content) => {
					return Promise.resolve(this.state.preview)
				}}
				disablePreview={true}
			>
			</ReactMde>
			<input type="text" onChange={(e) => {
				detail.article.tags = e.target.value.split(',');
			}}
				value={detail.article.tags.join(',')}
			/>
			<button onClick={() => {
				console.log(history);
				this.injected.detail.save();
			}}>
				save
			</button>
			<div dangerouslySetInnerHTML={{ __html: this.state.preview }}></div>
		</div>;
	}
}