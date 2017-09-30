import { Routes, RouterModule } from '@angular/router';
import {ExchangeComponent} from '../component/main/exchange.component';

const appRoutes: Routes = [
    {path: '', component: ExchangeComponent},
    {path: '**', redirectTo: '/'}
];

export const routes = RouterModule.forRoot(appRoutes);
