import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeAcountPage } from './see-acount.page';

const routes: Routes = [
  {
    path: '',
    component: SeeAcountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeAcountPageRoutingModule {}
