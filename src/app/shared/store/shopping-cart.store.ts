import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/interfaces/product";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
}

export const CartStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({products}) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products()))
  })),
  withMethods(({products, ...store}, toastService = inject(ToastrService)) => ({
    addToCart(product: Product) {
      const productInCart = products().find((item: Product) => item.id === product.id);

      if(productInCart){
        productInCart.quantity++;
        productInCart.subTotal = productInCart.quantity * productInCart.price;
        patchState(store, { products: [...products()]})
      } else {
        patchState(store, {
          products: [...products(), product]
        });
      }
      toastService.success('Product added', 'Store');
    },
    removeFromCart(id:number) {
      const updateProducts = products().filter(product => product.id !== id);
      patchState(store, {products: updateProducts});
      toastService.info('Product removed', 'Store');
    },
    clearCart() {
      patchState(store, initialState);
      toastService.info('Cart cleared', 'Store');
    },
  })),
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
};

const calculateProductCount = (products: Product[]): number => {
  return products.reduce((acc, product) => acc + product.quantity, 0);
}