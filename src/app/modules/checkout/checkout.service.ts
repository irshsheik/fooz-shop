import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Currency } from 'src/app/models/currency';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Order, OrderItem, OrderSplitCharges, } from 'src/app/models/order.modal';
import { Payment, PaymentType } from 'src/app/models/payment.model';
import { generateGuid } from 'src/app/util/app.lib';
import { CartService } from '../cart/cart.service';
import { ShippingService } from './shipping.service';
import { TaxService } from './tax.service';
import { AuthService } from '../auth/auth.service';
import { AddressService } from '../account/addresses/address.service';
import { OrderRemoteService } from 'src/app/services/remote/order-remote.service';
import { CouponService } from './coupon.service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private addressService: AddressService,
    private shippingService: ShippingService,
    private taxService: TaxService,
    private couponService: CouponService,
    private orderRemoteService: OrderRemoteService
  ) { }


  createOrder(paymentType: PaymentType) {
    const cartIds$ = this.cartService.cart$.pipe(map(cart => cart.map(item => item.Id)));
    return combineLatest(this.authService.userFromStore$, cartIds$, this.addressService.selectedAddress$, this.orderCharges$)
      .pipe(
        switchMap(([user, cartIds, selectedAddress, orderCharges]) => {
          const order = new OrderItem(generateGuid(), user.UID, cartIds, selectedAddress.Id);
          const status = OrderStatus.confirmed(order.Id);
          const payment = Payment.create(paymentType, order.Id, orderCharges.itemPrice, orderCharges.shipping, orderCharges.tax, orderCharges.coupon);
          return of(new Order(order, payment, [status]));
        }),
        tap(order => console.log('order => ', order)),
        switchMap(order => this.orderRemoteService.saveOrder(order)),
        tap(ok => {
          if (ok) {
            this.cartService.loadAllCartItems();
          }
        }),
        take(1)
      );
  }

  /** reduce right error here */
  orderCharges$: Observable<OrderSplitCharges> =
    this.cartService.cart$
      .pipe(
        switchMap(cart => {

          const itemTotalPrice = Currency.QAR(cart
            ?.map(item => item.Product.Price.Amount * item.SelectedQuantity)
            ?.reduce((price = 0, itemPrice) => price + itemPrice, 0));

          return combineLatest(of(itemTotalPrice), this.taxService.tax(itemTotalPrice),
            this.shippingService.shipping(itemTotalPrice), this.couponService.getVerifiedCoupon())
        }
        ),
        map(([amount, tax, shipping, coupon]) => {
          return <OrderSplitCharges>{
            itemPrice: amount,
            tax: tax,
            shipping: shipping,
            coupon: coupon
          }

        })
      );


  orderSize$ = this.cartService.cartSize$;






}
