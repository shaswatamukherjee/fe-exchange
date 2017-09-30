// Imports
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from '../_routes/app.route';
import {HttpModule} from '@angular/http';

// declarations
import {ExchangeComponent} from '../component/main/exchange.component';
import {SortByPricePipe} from '../_pipe/sortByPrice';
import {SortByCreatedTimePipe} from '../_pipe/sortByCreatedTime';

// Providers
import {ListOrderService} from '../_services/listOrder.service';
import { DatePipe } from '@angular/common';

@NgModule ({
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        routes,
        HttpModule
    ],
    exports: [],
    declarations: [
      ExchangeComponent,
      SortByPricePipe,
      SortByCreatedTimePipe
    ],
    providers: [
      ListOrderService,
      DatePipe
    ],
    bootstrap: [ExchangeComponent]
})
export class ExchangeModule {}
