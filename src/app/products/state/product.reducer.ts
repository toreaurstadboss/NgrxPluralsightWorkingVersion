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
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getError = createSelector(getProductFeatureState, state => state.error);

export function reducer(state = initialState, action: ProductActions): ProductState {
  // console.log(`state: ${JSON.stringify(state)}`;
  // console.log(`action payload:${action.payload}`);
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
     return {
       ...state,
       currentProduct: { ...action.payload }
     };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    default:
      return state;
  }
}
