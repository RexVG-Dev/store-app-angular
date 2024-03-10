import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/interfaces/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  // Using Input without signal
  // @Input({required: true}) productOld!: Product;

  @Output() addToCartEvent = new EventEmitter<Product>();

  onAddToCart = () => {
    this.addToCartEvent.emit(this.product());
  }
}
