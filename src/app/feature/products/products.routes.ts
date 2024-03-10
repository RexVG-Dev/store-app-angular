import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {path: '', loadComponent: () => import('./products.component')},
  {path: ':id', loadComponent: () => DetailsComponent },
];

export default routes;