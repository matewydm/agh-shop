import { Injectable } from '@angular/core';
import {Message} from './model/message';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  editProductMessage  = this.socket.fromEvent<Message>('productEdit');
  promotionMessage = this.socket.fromEvent<Message>('promotion');

  constructor(private socket: Socket) { }

}
