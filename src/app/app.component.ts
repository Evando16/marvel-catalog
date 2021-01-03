import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  template: `
    API Key: {{apiKey}}
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiKey = environment.marvelPublicKey
}
