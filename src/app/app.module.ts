import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import { TopBarComponent } from './header/top-bar/top-bar.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SearchComponent } from './header/nav-bar/search/search.component';
import { AccountComponent } from './header/nav-bar/account/account.component';
import { CartComponent } from './header/nav-bar/cart/cart.component';
import { ShopModule } from './shop/shop.module';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAtom,
  faBolt,
  faShoppingBag,
  faPhoneAlt,
  faSearch,
  faUserCircle,
  faCircleNotch,
  faBookmark,
  faHeart,
  faStar,
  faArrowCircleDown,
  faArrowAltCircleDown,
  faBoxOpen,
  faMapMarkerAlt,
  faFilter,
  faSort,
  faLevelDownAlt,
  faTape,
  faLayerGroup,
  faShoppingCart,
  faDotCircle,
  faTeethOpen,
  faDoorOpen,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faArrowsAltH,
  faArrowsAltV
} from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    NavBarComponent,
    SearchComponent,
    AccountComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ShopModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLiberary: FaIconLibrary) {
    iconLiberary.addIcons(
      faAtom,
      faBolt,
      faShoppingBag,
      faPhoneAlt,
      faSearch,
      faUserCircle,
      faBookmark,
      faHeart,
      faStar,
      faArrowCircleDown,
      faArrowAltCircleDown,
      faBookmark,
      faBoxOpen,
      faMapMarkerAlt,
      faFilter,
      faSort,
      faTape,
      faLayerGroup,
      faShoppingCart,
      faShoppingBag,
      faDotCircle,
      faDoorOpen,
      faLongArrowAltUp,
      faLongArrowAltDown,
      faArrowsAltH,
      faArrowsAltV
      );
  }


}
