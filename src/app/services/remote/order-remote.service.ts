import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { classToPlain } from 'class-transformer';
import { combineLatest, defer, Observable, of, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CartItem, CartItemStage } from 'src/app/models/cart-item';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Order, OrderItem } from 'src/app/models/order.modal';
import { Payment } from 'src/app/models/payment.model';
import { CART_COLLECTION, ORDER_ITEM_COLLECTION, ORDER_STATUS_COLLECTION, PAYMENT_COLLECTION } from 'src/app/util/app.constants';
import { ObjectTransformerService } from '../object-transformer.service';
import { CartRemoteService } from './cart-remote.service';
import { AddressRemoteService } from './address-remote.service';

@Injectable({
  providedIn: 'root'
})
export class OrderRemoteService {

  private orderItemCollection: AngularFirestoreCollection<OrderItem>;
  private orderStatusCollection: AngularFirestoreCollection<OrderStatus>;
  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(
    private db: AngularFirestore,
    private transformer: ObjectTransformerService,
    private cartRemoteService: CartRemoteService,
    private addressremoteService: AddressRemoteService
  ) {
    this.orderItemCollection = this.db.collection<OrderItem>(ORDER_ITEM_COLLECTION);
    this.orderStatusCollection = this.db.collection<OrderStatus>(ORDER_STATUS_COLLECTION);
    this.paymentCollection = this.db.collection<Payment>(PAYMENT_COLLECTION);
  }


  saveOrder(order: Order) {
    return defer(async () => {
      const batch = this.db.firestore.batch();

      const orderItemRef = this.db.firestore.collection(ORDER_ITEM_COLLECTION).doc(order.OrderItem.Id);
      batch.set(orderItemRef, classToPlain(order.OrderItem));

      const paymentRef = this.db.firestore.collection(PAYMENT_COLLECTION).doc(order.Payment.Id);
      batch.set(paymentRef, classToPlain(order.Payment));

      /** initialy only one status would be there */
      const statusRef = this.db.firestore.collection(ORDER_STATUS_COLLECTION).doc(order.StatusList[0].Id);
      batch.set(statusRef, classToPlain(order.StatusList[0]));

      order.OrderItem.CartItemIds.forEach(cartId => {
        const ref = this.db.firestore.collection(CART_COLLECTION).doc(cartId)
        batch.update(ref, { stage: CartItemStage.ORDER });
      });

      await batch.commit();
      return true;
    });
  }

  saveOrderStatus(status: OrderStatus) {
    return defer(async () => {
      await this.orderStatusCollection.doc(status.Id).set(classToPlain(status));
      return true;
    });
  }

  fetchOrders(userId: string) {
    return this.db.collection(ORDER_ITEM_COLLECTION, ref =>
      ref
        .where('userId', '==', userId)
    ).get()
      .pipe(
        map(qs => {
          const orders: Order[] = [];
          if (!qs.empty) {
            qs.forEach(doc => {
              const order = new Order();
              order.OrderItem = this.transformer.transformOrderItem(doc.data());
              orders.push(order);
            });
          }
          return orders;
        }),

        switchMap(orders => {
          const orderCarts = combineLatest(orders.map(order => this.cartRemoteService.fetchCartByIds(userId, order.OrderItem.CartItemIds)));
          const orderPayments = combineLatest(orders.map(order => this.fetchPaymentByOrderId(order.OrderItem.Id)));
          const orderStatusList = combineLatest(orders.map(order => this.fetchOrderStatusByOrderId(order.OrderItem.Id)));
          const orderAdddresses = combineLatest(orders.map(order => this.addressremoteService.fetchAddressForUserById(order.OrderItem.AddressId, userId)));
          return zip(of(orders), orderCarts, orderPayments, orderAdddresses, orderStatusList);
        }),
        map(([orders, orderCarts, orderPayments, orderAddresses, orderStatusList]) => {
          orders.forEach((order, index) => {
            order.Cart = orderCarts[index];
            order.Payment = orderPayments[index];
            order.Address = orderAddresses[index];
            order.StatusList = orderStatusList[index];
          });

          return orders;
        }),
        tap(orders => console.log('orders fetched', orders)),
      );
  }

  fetchOrderByOrderId(userId: string, orderId: string) {
    console.log('fetchOrderByOrderId called ', userId, orderId);
    return this.db.collection(ORDER_ITEM_COLLECTION, ref =>
      ref
        .where('userId', '==', userId)
        .where('id', '==', orderId)
    )
      .get()
      .pipe(
        map(qs => {
          let orderItem: OrderItem;
          console.log('beffore returning order ', orderItem);
          qs.forEach(doc => {
            orderItem = this.transformer.transformOrderItem(doc.data())
          });

          console.log('after returning order ', orderItem);
          return new Order(orderItem);
        }),
        switchMap(order => {
          console.log('order', order);
          const cart = this.cartRemoteService.fetchCartByIds(userId, order.OrderItem.CartItemIds);
          const payment = this.fetchPaymentByOrderId(order.OrderItem.Id);
          const statusList = this.fetchOrderStatusByOrderId(order.OrderItem.Id);
          const address = this.addressremoteService.fetchAddressForUserById(order.OrderItem.AddressId, userId);
          return zip(of(order), cart, payment, address, statusList);
        }),
        take(1),
        map(([order, cart, payment, address, statusList]) => {
          console.log('afterSwitchMap ', [order, cart, payment, statusList]);
          order.Cart = cart;
          order.Payment = payment;
          order.StatusList = statusList;
          order.Address = address;
          return order;
        }),
        tap(order => console.log('selectedOrder fetched ', order))
      );
  }


  fetchPaymentByOrderId(orderId: string): Observable<Payment> {
    return this.db.collection(PAYMENT_COLLECTION, ref =>
      ref.where('orderId', '==', orderId)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          let payment: Payment;
          querySnapShot.forEach(doc => {
            payment = this.transformer.transformPayment(doc.data());
          });
          return payment;
        })
      );
  }

  fetchOrderStatusByOrderId(orderId: string) {
    return this.db.collection(ORDER_STATUS_COLLECTION, ref =>
      ref.where('orderId', '==', orderId)
    )
      .get()
      .pipe(
        map(qs => {
          let status: OrderStatus[] = [];
          qs.forEach(doc => {
            status.push(this.transformer.transformOrderStatus(doc.data()));
          })
          return status;
        })
      );
  }



}