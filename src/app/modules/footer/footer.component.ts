import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status/status.service';
import { HeaderService } from '../header/header.service';
import { footerLables } from 'src/app/util/app.labels';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  labels = footerLables
  
  constructor(
    public fs:FooterService,
    public ss:StatusService) { }

  ngOnInit() {
  }

}
