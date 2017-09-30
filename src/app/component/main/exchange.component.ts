import { Component, OnInit, OnChanges } from '@angular/core';
import { ListOrderService } from '../../_services/listOrder.service';
import { Orders } from '../../_models/order.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exchange',
  templateUrl: '/app/component/main/exchange.component.html'
})

export class ExchangeComponent implements OnInit {
  modal: any;

  orderList: Orders[];
  bidOrders: Orders[];
  askOrders: Orders[];
  matchOrders: Orders[] = [];
  haltFetch: boolean;
  constructor(private listOrders: ListOrderService, private date: DatePipe) {}
  ngOnInit() {
    this.fetchOrders();
  }
  showMatchDetails(model: any) {
    this.haltFetch = true;
    alert('Match Time: ' + this.date.transform(model.time, 'jms') +
      '\n Quantity: ' + model.quantity +
      '\n Price: ' + model.price +
      '\nSell Order: ' + model.askPrice +
      '\nBuy Order: ' + model.bidPrice);
    this.haltFetch = false;
  }

  fetchOrders() {
    const randomStart = Math.floor(Math.random() * 20);
    const randomSize = Math.floor(Math.random() * 9990);
    this.listOrders.listOrder(randomStart.toString(), randomSize.toString())
      .subscribe((data) => {
        this.filterOrders(data);
        this.matchAlgorithm();
      });
  }

  filterOrders(orders: any): any {
    let bidCount = 0;
    let askCount = 0;
    this.bidOrders = [];
    this.askOrders = [];
    for ( let i = 0; i < orders.length; i++) {
      if ( orders[i].type === 'sell' && askCount < 20) {
        this.askOrders.push(orders[i]);
        askCount ++;
      } else if ( orders[i].type === 'buy' && bidCount < 20) {
        this.bidOrders.push(orders[i]);
        bidCount ++;
      }
      if (askCount === 20 && bidCount === 20) {
        break;
      }
    }
  }
  matchAlgorithm () {
    for (let i = 0; i < this.askOrders.length; i++) {
      const askOrder = this.askOrders[i];
      for (let j = 0; j < this.bidOrders.length; j++) {
        const bidOrder = this.bidOrders[j];
        if ( askOrder.price <= bidOrder.price) {
          let id: number;
          let quantity: number;
          let breakLoop: boolean;
          if ( bidOrder.quantity < askOrder.quantity) {
            id = bidOrder.id;
            quantity = bidOrder.quantity;
            this.bidOrders[j].style = 'green';
            this.bidOrders.splice(j, 1);
            this.askOrders[i].quantity = askOrder.quantity - bidOrder.quantity;
          } else if ( bidOrder.quantity > askOrder.quantity) {
            id = askOrder.id;
            quantity = askOrder.quantity;
            this.askOrders[i].style = 'green';
            this.askOrders.splice(i, 1);
            this.bidOrders[j].quantity = bidOrder.quantity - askOrder.quantity;
            breakLoop = true;
          } else {
            id = askOrder.id;
            quantity = askOrder.quantity;
            this.askOrders.splice(i, 1);
            this.bidOrders.splice(j, 1);
            breakLoop = true;
          }
          if ( this.matchOrders.length === 30 ) {
            this.matchOrders.shift();
          }
          this.matchOrders.push({
            time: Date.now(),
            id: id,
            type: 'match',
            quantity: quantity,
            askPrice: askOrder.price,
            bidPrice: bidOrder.price,
            price: (askOrder.price + bidOrder.price) / 2,
            style: 'green'
          });
          this.matchOrders[this.matchOrders.length - 1].style = '';
          if ( breakLoop ) {
            break;
          }
        }
      }
    }
    setTimeout(() => {
      if ( !this.haltFetch ) {
        this.fetchOrders();
      }
    }, 500);
  }

}
