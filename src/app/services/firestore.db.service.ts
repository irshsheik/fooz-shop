import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { classToPlain } from 'class-transformer';
import { Observable, of, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Address } from '../models/address';
import { CartItem } from '../models/cartItem';
import { Category } from '../models/category';
import { CustomSizeInput } from '../models/custom-size';
import { Image } from '../models/image';
import { LookBookItem } from '../models/lookbook';
import { Product } from '../models/product';
import { Size } from '../models/size';
import { Sort } from '../models/Sort';
import { User } from '../models/user';
import {
  ADDRESS_COLLECTION, CART_COLLECTION, CATEGORY_COLLECTION,
  CUSTOM_SIZE_INPUT,
  LOOKBOOK_COLLECTION, PRODUCT_COLLECTION,
  PRODUCT_PAGE_SIZE, SIZE_COLLECTION, SORT_COLLECTION, TREND_COLLECTION, USER_COLLECTION
} from '../util/app.constants';
import { generateGuid } from '../util/app.lib';
import { FakedataService } from './fakedata.service';
import { ObjectTransformerService } from './object-transformer.service';



@Injectable({
  providedIn: 'root'
})
export class FireStoreDbService {

  lastTimeStamp = 0;
  pageSize = 2;


  private cartCollection: AngularFirestoreCollection<CartItem>;
  private productCollection: AngularFirestoreCollection<Product>;
  private categoryCollection: AngularFirestoreCollection<Category>;
  private sizeCollection: AngularFirestoreCollection<Size>;
  private customSizeInputCollection: AngularFirestoreCollection<CustomSizeInput>;
  private sortCollection: AngularFirestoreCollection<Sort>;
  private trendCollection: AngularFirestoreCollection<Image>;
  private userCollection: AngularFirestoreCollection<User>;
  private addressCollection: AngularFirestoreCollection<Address>;
  private lookBookCollection: AngularFirestoreCollection<LookBookItem>;


  constructor(
    private db: AngularFirestore,
    private fakedataService: FakedataService,
    private objTransformer: ObjectTransformerService) {

    this.cartCollection = this.db.collection<CartItem>(CART_COLLECTION);
    this.productCollection = this.db.collection<Product>(PRODUCT_COLLECTION);
    this.categoryCollection = this.db.collection<Category>(CATEGORY_COLLECTION);
    this.sizeCollection = this.db.collection<Size>(SIZE_COLLECTION);
    this.customSizeInputCollection = this.db.collection<CustomSizeInput>(CUSTOM_SIZE_INPUT);
    this.sortCollection = this.db.collection<Sort>(SORT_COLLECTION);
    this.trendCollection = this.db.collection<Image>(TREND_COLLECTION);
    this.userCollection = this.db.collection<User>(USER_COLLECTION);
    this.addressCollection = this.db.collection<Address>(ADDRESS_COLLECTION);
    this.lookBookCollection = this.db.collection<LookBookItem>(LOOKBOOK_COLLECTION);
    this.bootstrapTestData();
  }

  private bootstrapTestData() {
    // this.saveProducts();
    // this.saveCategories();
    // this.saveSizes();
    // this.saveCustomSizeInputs();
    // this.saveSortOrders();
    // this.saveTrendItems(); 
    // this.saveLookBook()
  }



  saveProducts() {
    this.fakedataService.getProducts()
      .forEach(product =>
        this.productCollection.doc(product.Id).set(classToPlain(product)));
  }

  updateProduct(p: Product) {
    this.productCollection.doc(p.Id).set(classToPlain(p));
  }

  /**
   * add a different function for home component to fetch the latest onces only
   */
  fetchProducts(pageSize: number = PRODUCT_PAGE_SIZE): Observable<Product[]> {
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref
        .orderBy('timeStamp', 'asc')
        .limit(pageSize)
      // .startAfter(this.lastTimeStamp)
    ).get()
      .pipe(
        map(querySnapShot => {
          const products: Product[] = [];
          querySnapShot.forEach(doc => {
            products.push(this.objTransformer.transformProductFromDocData(doc.data()));
          });
          this.lastTimeStamp = products[products.length - 1].TimeStamp;
          return products;
        })
      );
  }

  /**
   * fetches latest products with a limit of 10
   */
  fetchLatestProducts(): Observable<Product[]> {
    console.log("fetchLatestProducts called");
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref
        .orderBy('timeStamp', 'desc')
        .limit(10)
    ).get()
      .pipe(
        map(querySnapShot => {
          const products: Product[] = [];
          querySnapShot.forEach(doc => {
            products.push(this.objTransformer.transformProductFromDocData(doc.data()));
          });
          return products;
        })
      );

  }

  /**
   * fetch more products for pagination
   */
  fetchMoreProducts(): Observable<Product[]> {
    return this.db.collection(PRODUCT_COLLECTION, ref => ref
      .orderBy('timeStamp', 'asc')
      .limit(PRODUCT_PAGE_SIZE)
      // .startAfter(this.lastTimeStamp)
    ).get()
      .pipe(
        map(querySnapShot => {
          const products: Product[] = [];
          querySnapShot.forEach(doc => {
            products.push(this.objTransformer.transformProductFromDocData(doc.data()));
          });
          if (products.length > 0) {
            this.lastTimeStamp = products[products.length - 1].TimeStamp;
          }
          return products;
        })
      );
  }


  fetchProductById(id: string): Observable<Product> {
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref.where('id', '==', id)
    )
      .get()
      .pipe(
        map(querySnapShot => {

          let product: Product;
          querySnapShot.forEach(doc => {
            product = this.objTransformer.transformProductFromDocData(doc.data());
          });
          return product;

        })
      );
  }


  saveCategories() {
    this.fakedataService.getCategories()
      .forEach(category => this.categoryCollection.doc(generateGuid()).set(classToPlain(category)));
  }

  fetchCategories(): Observable<Category[]> {
    return this.categoryCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const categories: Category[] = [];
          querySnapShot.forEach(doc => {
            categories.push(this.objTransformer.transformCategoryFromDocData(doc.data()));
          });
          return categories;
        })
      );
  }

  saveSizes() {
    this.fakedataService.getSizes()
      .forEach(size => this.sizeCollection.doc(generateGuid()).set(classToPlain(size)));
  }

  fetchSizes(): Observable<Size[]> {
    return this.sizeCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const sizes: Size[] = [];
          querySnapShot.forEach(doc => {
            sizes.push(this.objTransformer.transformSizeFromDocData(doc.data()));
          });
          return sizes;
        })
      );
  }

  saveCustomSizeInputs() {
    const customSizeInput = this.fakedataService.getCustomSizeInput();
    this.customSizeInputCollection.doc(generateGuid()).set(classToPlain(customSizeInput));
  }

  fetchCustomSizeInputs(): Observable<CustomSizeInput> {
    return this.customSizeInputCollection
      .get()
      .pipe(
        tap(querySnapShot => console.log('querySnapShot =>', querySnapShot)),
        map(querySnapShot => {
          let customSizeInput: CustomSizeInput;
          querySnapShot.forEach(doc => {
            customSizeInput = this.objTransformer.transformCustomSizeInput(doc.data());
          });
          return customSizeInput;
        })
      );
  }

  saveSortOrders() {
    this.fakedataService.getSortOrders()
      .forEach(order => this.sortCollection.doc(generateGuid()).set(classToPlain(order)));
  }


  fetchSortOrders(): Observable<Sort[]> {
    return this.sortCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const sorts: Sort[] = [];
          querySnapShot.forEach(doc => {
            sorts.push(this.objTransformer.transformSortFromDocData(doc.data()));
          });
          return sorts;
        })
      );
  }

  saveTrendItems() {
    this.fakedataService.getTrendItems().forEach(image => {
      this.trendCollection.doc(generateGuid()).set(classToPlain(image));
    });
  }

  fetchTrendItems(): Observable<Image[]> {
    return this.trendCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const images: Image[] = [];
          querySnapShot.forEach(doc => {
            images.push(this.objTransformer.transformImageFromDocData(doc.data()));
          });
          return images;
        })
      );
  }

  /** cart Operations START
   *
   *  1) save an item to db
   *  2) if the item is already present -- increase quantity
   *    //update the item in db and store
   *
   *  3) update the item directly in cart ex: add remove more quanity
   *  4) delete the item
   *  4)  fetch all items
   */
  saveCartItemToDb(item: CartItem) {
    return this.cartCollection.doc(item.Id).set(classToPlain(item));
  }

  updateCartInDb(items: CartItem[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        items.forEach(async (item) => await this.updateCartItemInDb(item));
        resolve();
      } catch (e) {
        reject(e);
      }
    });

  }


  updateCartItemInDb(item: CartItem) {
    return this.cartCollection.doc(item.Id).set(classToPlain(item));

  }
  deleteCartItemInDb(id: string) {
    return this.cartCollection.doc(id).delete();
  }

  fetchCart(userId: string): Observable<CartItem[]> {
    return this.db.collection(CART_COLLECTION, ref =>
      ref.where('userId', '==', userId)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          const items: CartItem[] = [];
          querySnapShot.forEach(doc => {
            items.push(this.objTransformer.transformcartItem(doc.data()));
          });
          console.log('Cart Items fetched from db = ', items);
          return items;
        })
      );
  }



  /** cart Operations END */


  /** Auth operations START */

  fetchUser(id: string): Observable<User> {
    return this.userCollection.doc(id).get()
      .pipe(
        map(querySnapShot => {
          return this.objTransformer.transformUserFromDocumentData(querySnapShot.data());
        })
      );
  }

  fetchUserByEmail(email: string): Observable<User[]> {
    return this.db.collection(USER_COLLECTION, ref =>
      ref.where('email', '==', email)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          const users: User[] = [];
          querySnapShot.forEach(doc => {
            users.push(this.objTransformer.transformUserFromDocumentData(doc.data()));
          });
          return users;
        })
      );
  }
  /**
   * Save user in firebase db
   * @param user user object
   */
  saveUser(user: User) {
    console.log('saveUser called ->', classToPlain(user));
    return this.userCollection.doc(user.UID).set(classToPlain(user));
  }

  /**
   * update the user in firebase
   * @param user the user Object
   */
  updateUser(user: User) {
    return this.userCollection.doc(user.UID).update(classToPlain(user));
  }

  /**
   *  make user inactive
   * @param id the user id
   */
  deActivateUser(id: string) {
    return this.userCollection.doc(id).update({ active: false });
  }

  /**
   * delete the user
   * @param id the user id
   */
  deleteUser(id: string) {
    return this.userCollection.doc(id).delete();
  }

  /** Auth operations END */

  /** Address Operations start */
  saveAddress(address: Address): Observable<boolean> {
    return this.toObservable(this.addressCollection.doc(address.Id).set(classToPlain(address)));
  }

  updateAddress(address: Address): Observable<boolean> {
    return this.toObservable(this.addressCollection.doc(address.Id).update(classToPlain(address)));
  }

  deleteAddress(id: string): Observable<boolean> {
    return this.toObservable(this.addressCollection.doc(id).delete());
  }

  getAddresses(userId: string): Observable<Address[]> {
    return this.db.collection(ADDRESS_COLLECTION, ref =>
      ref.where('userId', '==', userId)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          const addresses: Address[] = [];
          querySnapShot.forEach(doc => {
            addresses.push(this.objTransformer.transformAddressFromDocumentData(doc.data()));
          });
          return addresses;
        })
      );
  }
  /** Address Operations End */

  /** Lookbook items */

  saveLookBook() {
    this.fakedataService.getLookBook()
      .forEach(lb => this.lookBookCollection.doc(generateGuid()).set(classToPlain(lb)));
  }

  fetchLookBookItems(): Observable<LookBookItem[]> {
    return this.lookBookCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const items: LookBookItem[] = [];
          querySnapShot.forEach(doc => {
            items.push(this.objTransformer.transformLookBookItem(doc.data()));
          });
          return items;
        })
      );
  }

  /**lookbookitems //end */

  /**
   *  template function to convert a promise<void> to promise<boolean>
   * @param promisefn promise<void> type
   */
  private toObservable(promisefn: Promise<void>): Observable<boolean> {
    return new Observable<boolean>(observer => {
      promisefn
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

}
