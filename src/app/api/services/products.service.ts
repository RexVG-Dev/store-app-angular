import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/interfaces/product';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<any>([]);
  private readonly _injector = inject(EnvironmentInjector);

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


  getProductById(id: number) {
    /**
     * to handle the object as a signal it's necessary to use the
     * runInInjectionContext()
     * and create the injector 
     * private readonly _injector = inject(EnvironmentInjector);
     */
    return runInInjectionContext(this._injector, () => 
      toSignal<Product>(this.http.get<Product>(
        `${environment.apiUrlBase}products/${id}`
      ))
    );
  }

}
