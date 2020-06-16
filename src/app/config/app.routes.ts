import { Routes } from '@angular/router';
import { AccountComponent } from '../modules/account/account.component';
import { OverviewComponent } from '../modules/account/overview/overview.component';
import { OrdersComponent } from '../modules/account/orders/orders.component';
import { AddressesComponent } from '../modules/account/addresses/addresses.component';
import { ProfileComponent } from '../modules/account/profile/profile.component';

export const accountRoutes: Routes= [
    {
      path: 'my/account',
      component: AccountComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          component: OverviewComponent
        },
        {
          path: 'orders',
          component: OrdersComponent
        },
        {
          path: 'addresses',
          component: AddressesComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        }
      ]
    }
  ]