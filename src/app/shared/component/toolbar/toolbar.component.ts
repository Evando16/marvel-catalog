import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <div class="marvel-toolbar">
      <a [routerLink]="['/comics']">COMICS</a>
      <a [routerLink]="['/characters']">CHARACTERS</a>
    </div>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent { }
