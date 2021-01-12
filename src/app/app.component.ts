import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section class="marvel-app pl-40 pr-40">
      <div class="marvel-app__menu mb-16">
        <a [routerLink]="['/comics']">COMICS</a>
        <a [routerLink]="['/characters']">CHARACTERS</a>
      </div>
      <router-outlet></router-outlet>
    </section>
    <app-loading></app-loading>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
}
