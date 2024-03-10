import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartStore = inject(CartStore);
  private readonly _checkoutService = inject(CheckoutService);


  clearAll = () => {
    this.cartStore.clearCart();
  }

  removeItem = (id: number) => {
    this.cartStore.removeFromCart(id);
  }

  onProceedToPay = () => {
    this._checkoutService.onProceedToPay(this.cartStore.products());
  }
}
