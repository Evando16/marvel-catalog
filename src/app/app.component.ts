import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <div class="ml-40 mr-40 mb-40 mt-24">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
    <app-loading></app-loading>
  `
})
export class AppComponent {
}
