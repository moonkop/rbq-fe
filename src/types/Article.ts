import {Comment} from "./Comment";

export interface Article {
	name: string,
	content: string,
	modified: string,
	created: string,
	comments: Array<Comment>,
}