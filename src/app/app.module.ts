import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ItemCouroselComponent } from './home/item-courosel/item-courosel.component';
import { FeatureItemsComponent } from './home/feature-items/feature-items.component';
import { TrendComponent } from './home/trend/trend.component';
import { LookbookComponent } from './home/lookbook/lookbook.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShopComponent } from './shop/shop.component';
import {ItemsComponent} from './shop/items/items.component';
import { HomeComponent } from './home/home.component';
import { FilterHeaderComponent } from './shop/filter-header/filter-header.component';
import { ItemComponent } from './shop/items/item/item.component';
import { ItemDetailComponent } from './shop/items/item-detail/item-detail.component';
import { CustomSizeComponent } from './shop/items/item-detail/customize/custom-size/custom-size.component';
import { ItemCustomizeComponent } from './shop/items/item-detail/customize/item-customize.component';
import { ItemImagesComponent } from './shop/items/item-detail/item-images/item-images.component';
import { ItemInfoComponent } from './shop/items/item-detail/item-info/item-info.component';
import { ItemSizeComponent } from './shop/items/item-detail/item-size/item-size.component';
import { ItemBuyComponent } from './shop/items/item-detail/item-buy/item-buy.component';
import { ItemBuyGuideComponent } from './shop/items/item-detail/item-buy-guide/item-buy-guide.component';
import { SizeFilterComponent } from './shop/filter-header/size-filter/size-filter.component';
import { SortFilterComponent } from './shop/filter-header/sort-filter/sort-filter.component';
import { CategoryFilterComponent } from './shop/filter-header/category-filter/category-filter.component';
import { MainFilterComponent } from './shop/filter-header/main-filter/main-filter.component';
import { TopBarComponent } from './header/top-bar/top-bar.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';


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
import { SearchComponent } from './header/nav-bar/search/search.component';
import { AccountComponent } from './header/nav-bar/account/account.component';
import { CartComponent } from './header/nav-bar/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ItemCouroselComponent,
    FeatureItemsComponent,
    TrendComponent,
    LookbookComponent,
    ShopComponent,
    ItemsComponent,
    HomeComponent,
    FilterHeaderComponent,
    ItemComponent,
    ItemDetailComponent,
    CustomSizeComponent,
    ItemCustomizeComponent,
    ItemImagesComponent,
    ItemInfoComponent,
    ItemSizeComponent,
    ItemBuyComponent,
    ItemBuyGuideComponent,
    SizeFilterComponent,
    SortFilterComponent,
    CategoryFilterComponent,
    MainFilterComponent,
    TopBarComponent,
    NavBarComponent,
    SearchComponent,
    AccountComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule
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
