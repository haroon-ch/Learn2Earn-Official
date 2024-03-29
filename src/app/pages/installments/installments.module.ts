import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstallmentsPageRoutingModule } from './installments-routing.module';

import { InstallmentsPage } from './installments.page';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstallmentsPageRoutingModule,
    NgSelectModule
  ],
  declarations: [InstallmentsPage]
})
export class InstallmentsPageModule {}
