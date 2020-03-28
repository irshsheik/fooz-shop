import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map, take, switchMap } from 'rxjs/operators';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { addProductsAction, appendProductsAction, addCustomSizeInputAction } from './store/shop.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private store: Store<AppState>,
              private fbDbService: FireStoreDbService) {
  }

  /** this method fetches the data from db store */
  dispatchProductsToStore() {
    return this.fbDbService.fetchProducts()
      .pipe(
        map(products => {
          console.log('products got from dbstore : ', products);
          this.store.dispatch(addProductsAction({ payload: products }));
        }));
  }

  /** this method fetches the data from db store */
  dispatchMoreProductsToStore() {
    return this.fbDbService.fetchMoreProducts()
      .pipe(
        map(products => {
          console.log('more products got from dbstore : ', products);
          this.store.dispatch(appendProductsAction({ payload: products }));
        }));
  }

  dispatachCustomSizeInputsToStore() {
    return this.fbDbService.fetchCustomSizeInputs()
      .pipe(
        map(inputs => {
          console.log('custom size inputs from dbstore: ', inputs);
          this.store.dispatch(addCustomSizeInputAction({ payload: inputs }));
        })
      );
  }

  getShopFromStore() {
    return this.store.select('shop');
  }

  /**
   * This method fetches the product based on the product id.
   * if product is not present in the local store,
   * it is fetched from the database
   * @param id the product id
   */
  getProductFromStoreById(id: string) {
    return this.store.select('shop')
      .pipe(
        take(1),
        switchMap(state => {
          if (!state.products || state.products.length === 0) {
            const product = this.fbDbService.fetchProductByid(id);
            return product;
          } else {
            return of(state.products.find(product => product.id === id));
          }
        })
      );
  }

}
