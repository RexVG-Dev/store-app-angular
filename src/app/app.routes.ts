import { Routes } from '@angular/router';
import { CheckoutComponent } from './feature/checkout/checkout.component';


export const routes: Routes = [
  {path: 'products', loadChildren: () => import('./feature/products/products.routes')},
  {path: 'checkout', loadComponent: () => CheckoutComponent },
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: '**', redirectTo: 'products', pathMatch: 'full'}
];
