import {createBrowserHistory} from "history"

export const history = createBrowserHistory();

export function navigateTo(path:string) {
	history.push(path);
}