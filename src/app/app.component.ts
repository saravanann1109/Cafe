import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ItemService } from './service/item.service';
import { Message } from '../app/model/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private messageService: MessageService, private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.message.subscribe((message: Message) => {
      this.messageService.add({ severity: 'success', summary: message.Subject, detail: message.Description });
    })
  }


}
