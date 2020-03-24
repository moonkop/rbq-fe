import {Comment} from "./Comment";

export interface Article {
	tags: string[];
	id:string,
	name: string,
	content: string,
	modified: string,
	created: string,
	comments: Comment[],
}