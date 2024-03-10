import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/interfaces/product';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<any>([]);

  constructor(
    private http: HttpClient
  ) {
    // If we are gonna use signal it's necessary set the data at the beginning trough the constructor
    this.getProducts();
  }

  getProducts(): void{
    this.http.get<Product[]>(
      `${environment.apiUrlBase}products?sort=desc`
    ).pipe(tap( (data: Product[]) => this.products.set(data)))
    .subscribe();
  }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.apiUrlBase}products/${id}`
    )
  }

}
