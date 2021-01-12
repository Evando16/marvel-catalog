import { FooterService } from './footer.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="marvel-footer" *ngIf="footerService.getFooter()" [innerHTML]="footerService.getFooter()"></div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public footerService: FooterService) { }

}
