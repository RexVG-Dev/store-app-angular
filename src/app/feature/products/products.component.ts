import { Component, inject } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '@api/services/products.service';
import { Product } from '@shared/interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;


  onAddToCart = (product: any) => {
  }
}
