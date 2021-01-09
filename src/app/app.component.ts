import { Component } from '@angular/core';

@Component({
  selector: 'marvel-root',
  template: `
    <section class="marvel-app pl-40 pr-40">
      <div class="marvel-app__menu mb-16">
        <a [routerLink]="['/']" class="mr-16">Home</a><br>
        <a [routerLink]="['/comics']">Comics</a>
      </div>
      <router-outlet></router-outlet>
    </section>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
}
