import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/services/products.service';
import { Product } from '@shared/interfaces/product';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  starsArray: number[] = new Array(5).fill(0);
  
  // The next line it was replaced by the next bellow with signal
  // @Input({alias: 'id'}) productIdOld!: number;
  productId = input<number>(0, {alias: 'id'});
  product!: Signal<Product | undefined>;
  cartStore = inject(CartStore);

  private readonly productService = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.product = this.productService.getProductById(this.productId());
  }

  generateSvg = (index: number): SafeHtml => {
    let SVGContent = null;
    const rate = this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      SVGContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
      </path>
    </svg>`;
    } else if ( index < rate) {
      SVGContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
          <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
    </svg>`;
    } else {
      SVGContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`
    }

    return this._sanitizer.bypassSecurityTrustHtml(SVGContent);
  }

  onAddToCart = ():void => {
    this.cartStore.addToCart(this.product() as Product);
  }
}
