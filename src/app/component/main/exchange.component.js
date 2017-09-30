"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var listOrder_service_1 = require("../../_services/listOrder.service");
var common_1 = require("@angular/common");
var ExchangeComponent = (function () {
    function ExchangeComponent(listOrders, date) {
        this.listOrders = listOrders;
        this.date = date;
        this.matchOrders = [];
    }
    ExchangeComponent.prototype.ngOnInit = function () {
        this.fetchOrders();
    };
    ExchangeComponent.prototype.showMatchDetails = function (model) {
        this.haltFetch = true;
        alert('Match Time: ' + this.date.transform(model.time, 'jms') +
            '\n Quantity: ' + model.quantity +
            '\n Price: ' + model.price +
            '\nSell Order: ' + model.askPrice +
            '\nBuy Order: ' + model.bidPrice);
        this.haltFetch = false;
    };
    ExchangeComponent.prototype.fetchOrders = function () {
        var _this = this;
        var randomStart = Math.floor(Math.random() * 20);
        var randomSize = Math.floor(Math.random() * 9990);
        this.listOrders.listOrder(randomStart.toString(), randomSize.toString())
            .subscribe(function (data) {
            _this.filterOrders(data);
            _this.matchAlgorithm();
        });
    };
    ExchangeComponent.prototype.filterOrders = function (orders) {
        var bidCount = 0;
        var askCount = 0;
        this.bidOrders = [];
        this.askOrders = [];
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].type === 'sell' && askCount < 20) {
                this.askOrders.push(orders[i]);
                askCount++;
            }
            else if (orders[i].type === 'buy' && bidCount < 20) {
                this.bidOrders.push(orders[i]);
                bidCount++;
            }
            if (askCount === 20 && bidCount === 20) {
                break;
            }
        }
    };
    ExchangeComponent.prototype.matchAlgorithm = function () {
        var _this = this;
        for (var i = 0; i < this.askOrders.length; i++) {
            var askOrder = this.askOrders[i];
            for (var j = 0; j < this.bidOrders.length; j++) {
                var bidOrder = this.bidOrders[j];
                if (askOrder.price <= bidOrder.price) {
                    var id = void 0;
                    var quantity = void 0;
                    var breakLoop = void 0;
                    if (bidOrder.quantity < askOrder.quantity) {
                        id = bidOrder.id;
                        quantity = bidOrder.quantity;
                        this.bidOrders[j].style = 'green';
                        this.bidOrders.splice(j, 1);
                        this.askOrders[i].quantity = askOrder.quantity - bidOrder.quantity;
                    }
                    else if (bidOrder.quantity > askOrder.quantity) {
                        id = askOrder.id;
                        quantity = askOrder.quantity;
                        this.askOrders[i].style = 'green';
                        this.askOrders.splice(i, 1);
                        this.bidOrders[j].quantity = bidOrder.quantity - askOrder.quantity;
                        breakLoop = true;
                    }
                    else {
                        id = askOrder.id;
                        quantity = askOrder.quantity;
                        this.askOrders.splice(i, 1);
                        this.bidOrders.splice(j, 1);
                        breakLoop = true;
                    }
                    if (this.matchOrders.length === 30) {
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
                    if (breakLoop) {
                        break;
                    }
                }
            }
        }
        setTimeout(function () {
            if (!_this.haltFetch) {
                _this.fetchOrders();
            }
        }, 500);
    };
    return ExchangeComponent;
}());
ExchangeComponent = __decorate([
    core_1.Component({
        selector: 'app-exchange',
        templateUrl: '/app/component/main/exchange.component.html'
    }),
    __metadata("design:paramtypes", [listOrder_service_1.ListOrderService, common_1.DatePipe])
], ExchangeComponent);
exports.ExchangeComponent = ExchangeComponent;
//# sourceMappingURL=exchange.component.js.map