import { Injectable } from '@angular/core';
import {Message} from './model/message';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  currentMessage  = this.socket.fromEvent<Message>('message');
  constructor(private socket: Socket) { }
}

