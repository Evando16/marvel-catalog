import { PaginatorModule } from './../shared/component/paginator/paginator.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicRoutingModule } from './comic-routing.module';
import { ComicListComponent } from './comic-list/comic-list.component';
import { CardModule } from './../shared/component/card/card.module';
import { ComicDetailsComponent } from './comic-details/comic-details.component';


@NgModule({
  declarations: [ComicListComponent, ComicDetailsComponent],
  imports: [
    CommonModule,
    ComicRoutingModule,
    CardModule,
    PaginatorModule
  ]
})
export class ComicModule { }
