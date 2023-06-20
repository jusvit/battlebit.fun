import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserRoutingModule } from './browser-routing.module';
import { BrowserComponent } from './browser.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    BrowserComponent
  ],
  imports: [
    CommonModule,
    BrowserRoutingModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ]
})
export class BrowserModule { }
