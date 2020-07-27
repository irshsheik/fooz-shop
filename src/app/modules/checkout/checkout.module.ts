import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AddressViewComponent } from './address-view/address-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { OrderAmountComponent } from './order-amount/order-amount.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [CheckoutComponent, CartViewComponent, OrderAmountComponent, AddressViewComponent, PaymentComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule
  ]
})
export class CheckoutModule { }
