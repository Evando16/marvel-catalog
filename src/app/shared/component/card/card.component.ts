import { Image } from './../../interface/image.model';
import { Card } from './card.model';
import { Component, OnInit } from '@angular/core';
import { CardDetailType } from './card-detail-type.enum';

@Component({
  selector: 'marvel-card',
  template: `
    <div class="marvel-card">
      <div>
        <span>{{card.title}}</span>
        <span>{{card.description}}</span>
      </div>
      <img [src]="getThumbnailUrl(card.thumbnail)">      
      <div *ngFor="let item of card.author">
        <span>{{item.name}}</span> - <b>{{item.role}}</b>
      </div>
      <div *ngFor="let item of card.detail">
        <span>{{item.name}}</span>
        <span>{{item.description}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public card: Card = {
    id: 1749,
    title: 'Official Handbook of the Marvel Universe (2004) #11 (X-MEN - AGE OF APOCALYPSE)',
    description: 'Your complete guide to the epic saga! This Official Handbook includes in-depth bios on more than 40 denizens of the Age of Apocalypse - from Abyss to Weapon X! Plus: An all-new cover by superstar-in-waiting Mark Brooks, digitally painted by Justin Ponsor.\r<br>48 PGS./Marvel PSR ...$3.99\r<br>',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/b0/4bc6494ed6eb4',
      extension: 'jpg'
    },
    author: [
      {
        name: 'Mark Brooks',
        role: 'penciller (cover)'
      },
      {
        name: 'Mike Raicht',
        role: 'writer'
      }
    ],
    detail: [
      {
        name: 'Apocalypse',
        description: 'Apocalypse - description',
        detailType: CardDetailType.CHARACTER
      },
      {
        name: 'Sunfire',
        description: 'Sunfire - description',
        detailType: CardDetailType.CHARACTER
      },
      {
        name: 'Colossus',
        description: 'Colossus - description',
        detailType: CardDetailType.CHARACTER
      },
      {
        name: 'Magneto',
        description: 'Magneto - description',
        detailType: CardDetailType.CHARACTER
      }
    ]

  }
  constructor() { }

  public ngOnInit(): void { }

  public getThumbnailUrl(thumbnail: Image): string {
    return `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  }

}
