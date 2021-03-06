"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SortByPricePipe = (function () {
    function SortByPricePipe() {
    }
    SortByPricePipe.prototype.transform = function (list, order) {
        list.sort(function (a, b) {
            if (order === 'desc') {
                return b.price - a.price;
            }
            else {
                return a.price - b.price;
            }
        });
        return list;
    };
    return SortByPricePipe;
}());
SortByPricePipe = __decorate([
    core_1.Pipe({ name: 'sortByPrice' })
], SortByPricePipe);
exports.SortByPricePipe = SortByPricePipe;
//# sourceMappingURL=sortByPrice.js.map