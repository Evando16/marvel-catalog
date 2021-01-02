import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicRoutingModule } from './comic-routing.module';
import { ComicListComponent } from './comic-list/comic-list.component';


@NgModule({
  declarations: [ComicListComponent],
  imports: [
    CommonModule,
    ComicRoutingModule
  ]
})
export class ComicModule { }
