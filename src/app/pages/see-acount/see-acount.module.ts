import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeAcountPageRoutingModule } from './see-acount-routing.module';

import { SeeAcountPage } from './see-acount.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeAcountPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SeeAcountPage]
})
export class SeeAcountPageModule {}
