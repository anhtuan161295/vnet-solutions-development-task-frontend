import { Component } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-sale-results',
  templateUrl: './sale-results.component.html',
  styleUrls: ['./sale-results.component.scss'],
  providers: [WebsocketService]
})
export class SaleResultsComponent {

  salesResults = [];
  websocketService: WebsocketService;
  columnsToDisplay = ['product-name', 'store-name', 'total-sales-units', 'total-sales-revenue'];

  constructor(
  ) {
    this.websocketService = new WebsocketService(this);
  }

  ngOnInit() {
    this.websocketService.connect();
    setTimeout(() => {
      this.websocketService.send("");
    }, 3000);
  }

  ngOnDestroy() {

  }

  handleMessage(message: any) {
    this.salesResults = JSON.parse(message.body);
    console.log(this.salesResults);
  }

}
