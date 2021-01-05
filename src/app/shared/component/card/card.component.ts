import { Component, Input, OnInit } from '@angular/core';

import { Card } from './card.model';

@Component({
  selector: 'marvel-card',
  template: `
    <div class="marvel-card p-16">
      <img [src]="card.thumbnailUrl">    
      <div class="marvel-card__header">
        <span class="marvel-card__header--title mb-8">{{card.title}}</span>
        <span class="marvel-card__header--sub-title mb-8">{{card.shortDescription}}</span>
      </div>  
      <div class="marvel-card__content">
        <!-- <div *ngFor="let item of card.author">
          <span>{{item.name}}</span> - <b>{{item.role}}</b>
        </div>
        <div *ngFor="let item of card.detail">
          <span>{{item.name}}</span>
          <span>{{item.description}}</span>
        </div> -->
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public card!: Card;
  constructor() { }

  public ngOnInit(): void { }
}
