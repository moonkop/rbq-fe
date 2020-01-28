import {Comment} from "./Comment";

export interface Article {
	id:string,
	name: string,
	content: string,
	modified: string,
	created: string,
	comments: Array<Comment>,
}