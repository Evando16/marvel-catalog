import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a [routerLink]="['/']">Home</a><br>
    <a [routerLink]="['/comics']">Comics</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
