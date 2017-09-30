"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var exchange_component_1 = require("../component/main/exchange.component");
var appRoutes = [
    { path: '', component: exchange_component_1.ExchangeComponent },
    { path: '**', redirectTo: '/' }
];
exports.routes = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.route.js.map