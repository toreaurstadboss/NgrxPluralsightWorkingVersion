import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import * as fromProduct from '../state/product.reducer';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  componentActive = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );
    //TODO: unsubscribe
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // , takeWhile(() => this.componentActive))
    // .subscribe((products: Product[]) => this.products = products);

    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode => this.displayCode = showProductCode);

  //  this.sub =  this.store.pipe(select('products')).subscribe((products: fromProduct.State) => {
  //     if (products) {
  //       this.displayCode = products.products.showProductCode;
  //     });

  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.componentActive = false;
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
