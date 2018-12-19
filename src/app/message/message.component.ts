import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../message.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  private socketSub: Subscription;

  constructor(private messageService: MessageService,
              private toast: ToastrService) { }

  ngOnInit() {
    console.log('MessageComponent ngOnInit');
    this.socketSub = this.messageService.promotionMessage.subscribe(
      message => {
        this.toast.info('Powiadomienie', message.content);
      }
    );
  }

  ngOnDestroy() {
    console.log('MessageComponent ngOnDestroy');
    this.socketSub.unsubscribe();
  }

}
