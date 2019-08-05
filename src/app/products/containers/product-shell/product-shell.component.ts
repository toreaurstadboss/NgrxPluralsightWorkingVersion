import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import * as fromProduct from '../../state/product.reducer';
import { Product } from '../../product';
import { ProductService } from '../../product.service';
import { Store, select } from '@ngrx/store';
import * as productActions from '../../state/product.actions';
import { takeWhile } from 'rxjs/operators';


@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products: Observable<Product[]>;
  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product> | null;
  sub: Subscription;
  componentActive = true;
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }


  checkChanged(value: boolean): void {
    // this.store.dispatch({
    //   type: 'TOGGLE_PRODUCT_CODE',
    //   payload: value
    // });
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
