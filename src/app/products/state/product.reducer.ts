import { Product } from '../product';
import { ProductActionTypes, ProductActions } from './product.actions';

  export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
  }

  const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
  };
export function reducer(state = initialState, action: ProductActions): ProductState {
  // console.log(`state: ${JSON.stringify(state)}`;
  // console.log(`action payload:${action.payload}`);
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
      case ProductActionTypes.InitializeCurrentProduct:
        return {
          ...state,
          products: [],
          currentProductId: 0
        };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionTypes.SetCurrentProduct:
     return {
       ...state,
       currentProductId: action.payload.id
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
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item);
        return {
          ...state,
          products: updatedProducts,
          currentProductId: action.payload.id,
          error: ''
        };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
    }
}

