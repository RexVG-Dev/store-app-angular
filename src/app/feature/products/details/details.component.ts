import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { ProductsService } from '@api/services/products.service';
import { Product } from '@shared/interfaces/product';

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

  private readonly productService = inject(ProductsService);

  ngOnInit(): void {
    this.product = this.productService.getProductById(this.productId());
  }

  generateSVG = (index: number) => {}

  onAddToCart = () => {}
}
