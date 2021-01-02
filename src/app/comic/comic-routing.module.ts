import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicListComponent } from './comic-list/comic-list.component';

const routes: Routes = [
  {path: '', component: ComicListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicRoutingModule { }
