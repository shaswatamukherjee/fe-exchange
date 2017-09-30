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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ListOrderService = (function () {
    function ListOrderService(http) {
        this.http = http;
    }
    ListOrderService.prototype.listOrder = function (start, size) {
        var params = new http_1.URLSearchParams();
        params.set('size', size);
        params.set('start', start);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.params = params;
        return this.http.get('http://localhost:5001/listOrders', requestOptions)
            .map(function (response) {
            return response.json();
        });
    };
    return ListOrderService;
}());
ListOrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ListOrderService);
exports.ListOrderService = ListOrderService;
//# sourceMappingURL=listOrder.service.js.map