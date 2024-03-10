import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment.development';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';

import { Product } from '@shared/interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.stripeServerUrl;

  onProceedToPay(products: Product[]): any {
    return this.http.post(`${this.url}/checkout`, {items: products})
      .pipe(
        map(async(res:any) => {
          const stripe = await loadStripe(environment.stripeApiKey);

          stripe?.redirectToCheckout({sessionId: res.id })
        })
      ).subscribe({
        error: (err) => console.error('Error', err),
      })
  }
}
