import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphDataPageRoutingModule } from './graph-data-routing.module';

import { GraphDataPage } from './graph-data.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphDataPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [GraphDataPage]
})
export class GraphDataPageModule {}
