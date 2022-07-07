import { Component } from '@angular/core';
import { Message } from './Models/message';
import { ChatService } from './Services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signalr-client';
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: Message) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent
                                                     
  }

  msgDto: Message = new Message();
  msgInboxArray: Message[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.messageID == 0 || this.msgDto.messageID == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: Message) {
    let newObj = new Message();
    newObj.messageID = obj.messageID;
    newObj.messageText = obj.messageText;
    this.msgInboxArray.push(newObj);

  }
}
