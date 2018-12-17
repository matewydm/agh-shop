import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../message.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  private _mesSub: Subscription;

  constructor(private messageService: MessageService,
              private toastService: ToastrService) { }

  ngOnInit() {
    console.log('MessageComponent ngOnInit');
    this._mesSub = this.messageService.currentMessage.subscribe(
      message => {
        this.toastService.info('Powiadomienie!', message.content);
      }
    );
  }

  ngOnDestroy() {
    console.log('MessageComponent ngOnDestroy');
    this._mesSub.unsubscribe();
  }

}
