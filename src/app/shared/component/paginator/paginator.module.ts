import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorComponent } from './paginator.component';
import { ButtonModule } from '../button/button.module';
import { SelectFieldModule } from '../select-field/select-field.module';



@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SelectFieldModule
  ],
  exports: [PaginatorComponent]
})
export class PaginatorModule { }
