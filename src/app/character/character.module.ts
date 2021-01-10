import { InputFieldModule } from './../shared/component/input-field/input-field.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorModule } from './../shared/component/paginator/paginator.module';
import { CardModule } from './../shared/component/card/card.module';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterListComponent } from './character-list/character-list.component';


@NgModule({
  declarations: [CharacterListComponent],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    CardModule,
    PaginatorModule,
    InputFieldModule
  ]
})
export class CharacterModule { }
