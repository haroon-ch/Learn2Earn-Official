import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAcountPage } from './add-acount.page';

const routes: Routes = [
  {
    path: '',
    component: AddAcountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAcountPageRoutingModule {}
