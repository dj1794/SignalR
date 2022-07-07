import { Injectable, OnInit } from '@angular/core';     // import signalR
import { HttpClient } from '@angular/common/http';
import * as signalR from  '@aspnet/signalr'
import { Observable, Subject } from 'rxjs';
import { Message } from '../Models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

   private  connection: any = new signalR.HubConnectionBuilder().withUrl("http://localhost:5054/message")   // mapping to the chathub as in startup.cs
                                         .configureLogging(signalR.LogLevel.Information)
                                         .build();
   readonly POST_URL = "http://localhost:5054/api/chat/send"

  private receivedMessageObject: Message = new Message();
  private sharedObj = new Subject<Message>();

  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   this.connection.on("ReceiveOne", (messageID:Number, messageText:string) => { this.mapReceivedMessage(messageID, messageText); });
   this.start();                 
  }


  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(messageID: Number, message: string): void {
    this.receivedMessageObject.messageID = messageID;
    this.receivedMessageObject.messageText = message;
    this.sharedObj.next(this.receivedMessageObject);
 }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<Message> {
    return this.sharedObj.asObservable();
  }
}