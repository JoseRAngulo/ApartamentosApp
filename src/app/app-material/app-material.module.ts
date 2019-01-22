import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatGridListModule, MatInputModule,
  MatButtonModule, MatSelectModule,
  MatSidenavModule, MatListModule,
  MatTableModule, MatIconModule,
  MatDialogModule, MatDatepickerModule,
  MatNativeDateModule, MatPaginatorModule,
  MatSortModule, MatCheckboxModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule
  ]
})
export class AppMaterialModule { }
