import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { ShopService } from '../shop.service';
import { FilterHeaderService } from '../filter-header/filter-header.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: Product[];
  selectedCategory: Category;
  selectedSize: Size;
  selectedSort: Sort;
  subs: Subscription[] = [];

  constructor(
    private shopService: ShopService,
    private filterHeaderService: FilterHeaderService,
    private logger: LogService
  ) { }


  ngOnInit() {

    this.subs[this.subs.length + 1] =
      this.shopService.getProductsFromStore()
        .subscribe(state => {
          this.items = state.products;
        });

    this.subs[this.subs.length + 1] =
      this.filterHeaderService.getFiltersFromStore()
        .subscribe(filters => {
          this.logger.info('selected called from ItemsComponent');
          this.selectedCategory = filters.selectedCategory;
          this.selectedSize = filters.selectedSize;
          this.selectedSort = filters.selectedSortOrder;
        });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}