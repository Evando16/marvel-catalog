import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'comics',
    loadChildren: () => import('./comic/comic.module').then(module => module.ComicModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./character/character.module').then(module => module.CharacterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
