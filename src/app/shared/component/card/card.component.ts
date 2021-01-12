import { Component, Input, OnInit } from '@angular/core';

import { Card } from './card.model';

@Component({
  selector: 'app-card',
  template: `
    <div class="marvel-card p-16">
      <img [src]="card.thumbnailUrl" [alt]="card.title" loading="lazy">
      <span class="marvel-card__header--title mt-8">{{card.title}}</span>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() public card!: Card;
}
