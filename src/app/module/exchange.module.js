"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var app_route_1 = require("../_routes/app.route");
var http_1 = require("@angular/http");
// declarations
var exchange_component_1 = require("../component/main/exchange.component");
var sortByPrice_1 = require("../_pipe/sortByPrice");
var sortByCreatedTime_1 = require("../_pipe/sortByCreatedTime");
// Providers
var listOrder_service_1 = require("../_services/listOrder.service");
var common_2 = require("@angular/common");
var ExchangeModule = (function () {
    function ExchangeModule() {
    }
    return ExchangeModule;
}());
ExchangeModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            platform_browser_1.BrowserModule,
            app_route_1.routes,
            http_1.HttpModule
        ],
        exports: [],
        declarations: [
            exchange_component_1.ExchangeComponent,
            sortByPrice_1.SortByPricePipe,
            sortByCreatedTime_1.SortByCreatedTimePipe
        ],
        providers: [
            listOrder_service_1.ListOrderService,
            common_2.DatePipe
        ],
        bootstrap: [exchange_component_1.ExchangeComponent]
    })
], ExchangeModule);
exports.ExchangeModule = ExchangeModule;
//# sourceMappingURL=exchange.module.js.map