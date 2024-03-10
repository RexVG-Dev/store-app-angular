import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/interfaces/product";

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
  withMethods(({products, ...store}) => ({
    addToCart(product: Product) {
      patchState(store, {
        products: [...products(), product]
      });
    },
    removeFromCart(id:number) {
      const updateProducts = products().filter(product => product.id !== id);
      patchState(store, {products: updateProducts});
    },
    clearCart() {
      patchState(store, initialState)
    },
  })),
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price, 0);
};

const calculateProductCount = (products: Product[]): number => {
  return products.reduce((acc, product) => acc + product.quantity, 0);
}