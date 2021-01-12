import { FooterService } from './footer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="marvel-footer" *ngIf="footerService.getFooter()" [innerHTML]="footerService.getFooter()"></div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public footerService: FooterService) { }

  ngOnInit(): void {
  }

}
