import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreCardComponent } from './pre-card/pre-card.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './toasts/toasts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { LookbookItemComponent } from './lookbook-item/lookbook-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ItemComponent,
    PreCardComponent,
    ToastsComponent,
    SidebarComponent,
    ParallaxComponent,
    LookbookItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbToastModule,
  ],
  exports: [
    ItemComponent,
    PreCardComponent,
    ToastsComponent,
    SidebarComponent,
    ParallaxComponent,
    LookbookItemComponent
  ]
})
export class SharedModule { }
