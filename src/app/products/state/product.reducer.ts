import { Product } from "src/app/products/product";
import * as fromRoot from "../../state/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "../state/product.actions";

export interface State extends fromRoot.State {
 products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, state => state.products);

export function reducer(state = initialState, action: ProductActions) : ProductState {
  // console.log(`state: ${JSON.stringify(state)}`;
  // console.log(`action payload:${action.payload}`);
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct
     return {
       ...state,
       currentProduct: { ...action.payload };
     };:

    default:
      return state;
  }
}
