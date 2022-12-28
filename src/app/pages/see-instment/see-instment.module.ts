import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeInstmentPageRoutingModule } from './see-instment-routing.module';

import { SeeInstmentPage } from './see-instment.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeInstmentPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SeeInstmentPage]
})
export class SeeInstmentPageModule {}
