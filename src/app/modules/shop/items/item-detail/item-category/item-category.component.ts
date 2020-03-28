import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

  centerOpenAbaya: Category;
  buttonedAbaya: Category;

  @Input() category: Category;
  constructor() { }

  ngOnInit(): void {
    this.centerOpenAbaya = new Category('CO', 'center open');
    this.buttonedAbaya = new Category('BA', 'buttoned abaya');
    console.log('category => ', this.category);
  }

  isButtonedAbaya() {
    return this.category.getCode() === this.buttonedAbaya.getCode();
  }
  isCenterOpenAbaya() {
    return this.category.getCode() === this.centerOpenAbaya.getCode();
  }

  setCategory(code: string) {
    if (code === this.centerOpenAbaya.getCode()) {
      this.category = this.centerOpenAbaya;
    } else {
      this.category = this.buttonedAbaya;

    }

  }

}