import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CartItemComponent } from './cart-items/cart-item/cart-item.component';



@NgModule({
  declarations: [
    CartComponent,
    CartItemsComponent,
    CartModalComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CartRoutingModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
