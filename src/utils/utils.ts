import {Converter} from "showdown";

export const converter = new Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true
})