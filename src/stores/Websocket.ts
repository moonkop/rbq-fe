import {articles} from "./Articles";
import {Article} from "../types/Article";

export interface WsMessage {
	id: number,
	payload: object,
	reponse?: object,
	callback?: WsCallback,
}

export type WsCallback = (reponse: object) => void

export class WebsocketStore {
	ws: WebSocket
	messageId: number
	messagePool: WsMessage[]

	constructor() {
		this.messageId = 0;
		this.messagePool = [];
		this.ws = new WebSocket('ws://localhost:8080/ws');
		this.ws.onopen = () => {
			console.log("ws opened");
		}
		this.ws.onclose = () => {
			console.log("ws closed");
		}
		this.ws.onerror = () => {
			console.log('ws closed');
		}
		this.ws.onmessage = (msg:MessageEvent ) => {
			let data = JSON.parse(msg.data);
			let type=data.type;
			switch (type) {
				case 'update':
					let article:Article = data.payload;
					let oldArticle = articles.list.find(item => article.id == item.id);
					if (oldArticle) {
						oldArticle.content = article.content;
					}
					break;
			}
			console.log("ws onmessage", data);
		}
	}

	sendMessage(type:string,data: object, callback?: WsCallback): boolean {
		try {
			let obj = {
				id: this.messageId++,
				payload: data,
				type,
			}
			if (typeof callback == 'function') {
				this.messagePool.push({...obj, callback})
			}
			this.ws?.send(JSON.stringify(obj))
			return true;
		} catch (e) {
			return false;
		}
	}

}

export const websocketStore = new WebsocketStore();