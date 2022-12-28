import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAcountPageRoutingModule } from './add-acount-routing.module';

import { AddAcountPage } from './add-acount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAcountPageRoutingModule
  ],
  declarations: [AddAcountPage]
})
export class AddAcountPageModule {}
