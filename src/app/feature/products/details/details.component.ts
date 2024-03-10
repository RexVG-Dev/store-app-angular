import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  starsArray: number[] = new Array(5).fill(0);

  product = () => {
    return {
      id: 1,
      image: '',
      title: '',
      category: '',
      description: '',
      price: 2,
      rating: {
        count: 1
      }
    }
  }

  generateSVG = (index: number) => {}

  onAddToCart = () => {}
}
