import {Converter} from "showdown";
import {history} from "../history";

export const converter = new Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true
})
