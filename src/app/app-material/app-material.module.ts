import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatGridListModule, MatInputModule,
  MatButtonModule, MatSelectModule,
  MatSidenavModule, MatListModule,
  MatTableModule, MatIconModule,
  MatDialogModule
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
    MatDialogModule
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
    MatDialogModule
  ]
})
export class AppMaterialModule { }
