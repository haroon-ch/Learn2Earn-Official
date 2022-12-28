import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeInstmentPage } from './see-instment.page';

const routes: Routes = [
  {
    path: '',
    component: SeeInstmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeInstmentPageRoutingModule {}
