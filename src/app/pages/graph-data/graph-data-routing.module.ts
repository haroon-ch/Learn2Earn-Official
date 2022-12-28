import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphDataPage } from './graph-data.page';

const routes: Routes = [
  {
    path: '',
    component: GraphDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphDataPageRoutingModule {}
