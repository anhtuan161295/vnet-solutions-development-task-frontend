import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SaleResultsComponent } from '../sale-results/sale-results.component';

export interface Message {
  source: string;
  content: string;
}

const CHAT_URL = "ws://localhost:8080/ws";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/sale-results";
  stompClient!: Stomp.Client;
  saleResultsComponent: SaleResultsComponent

  constructor(saleResultsComponent: SaleResultsComponent) {
    this.saleResultsComponent = saleResultsComponent;
  }

  connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
    }, this.errorCallBack);
  };

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => {}, {});
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  /**
  * Send message to server via web socket
  * @param {*} message 
  */
  send(message: string) {
    console.log("send message via web socket");
    this.stompClient.send("/app/get-sale-results", {}, message);
  }

  onMessageReceived(message: string) {
    console.log("message received from server :: " + message);
    this.saleResultsComponent.handleMessage(message);
  }

}
