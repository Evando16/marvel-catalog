import { Component, OnInit } from '@angular/core';

import { Paginator } from './../../shared/component/paginator/paginator.model';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-list',
  template: `
    <section class="character-list">
      <app-paginator (paginatorChange)="onChangePage($event)"
        [itemsPerPageOptions]="characterService.paginatorOptions"
        [total]="characterService.totalCharacters"></app-paginator>
      <app-input-field
        [placeholder]="'Search by name'"
        [label]="'Filter'"
        (keyPressed)="onFilterChange($event)">
      </app-input-field>
      <div class="character-list__card-container">
        <app-card 
          class="character-list__card"
          *ngFor="let card of characterService.characterCards"
          [card]="card">
        </app-card>
      </div>
    </section>
  `,
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  private offset: number = 0;
  private itemsPerPage!: number;
  private filterByNameValue!: string;

  constructor(public readonly characterService: CharacterService) { }

  public async ngOnInit(): Promise<void> {
    this.itemsPerPage = +this.characterService.paginatorOptions[0].value;
    this.characterService.requestCharacters(this.offset, this.itemsPerPage);
  }

  public async onChangePage(action: Paginator): Promise<void> {
    this.offset = action.itemsPerPage * (action.page - 1);
    this.itemsPerPage = action.itemsPerPage;
    this.characterService.requestCharacters(this.offset, this.itemsPerPage, this.filterByNameValue);
  }

  public async onFilterChange(filterValue: string): Promise<void> {
    this.filterByNameValue = filterValue;
    this.characterService.requestCharacters(this.offset, this.itemsPerPage, this.filterByNameValue);
  }
}