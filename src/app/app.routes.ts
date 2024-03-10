import { Routes } from '@angular/router';
import { DetailsComponent } from './feature/products/details/details.component';
import { CheckoutComponent } from './feature/checkout/checkout.component';


export const routes: Routes = [
  {path: 'products', loadComponent: () => import('./feature/products/products.component')},
  {path: 'products-details/:id', loadComponent: () => DetailsComponent },
  {path: 'checkout', loadComponent: () => CheckoutComponent },
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: '**', redirectTo: 'products', pathMatch: 'full'}
];
