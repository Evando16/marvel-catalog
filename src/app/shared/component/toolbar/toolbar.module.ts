import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
