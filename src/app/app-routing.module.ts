import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'st-adm',
    loadChildren: () => import('./pages/st-adm/st-adm.module').then( m => m.StAdmPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'st-details',
    loadChildren: () => import('./st-details/st-details.module').then( m => m.StDetailsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'installments',
    loadChildren: () => import('./pages/installments/installments.module').then( m => m.InstallmentsPageModule)
  },
  {
    path: 'see-instment',
    loadChildren: () => import('./pages/see-instment/see-instment.module').then( m => m.SeeInstmentPageModule)
  },
  {
    path: 'add-acount',
    loadChildren: () => import('./pages/add-acount/add-acount.module').then( m => m.AddAcountPageModule)
  },
  {
    path: 'see-acount',
    loadChildren: () => import('./pages/see-acount/see-acount.module').then( m => m.SeeAcountPageModule)
  },
  {
    path: 'graph-data',
    loadChildren: () => import('./pages/graph-data/graph-data.module').then( m => m.GraphDataPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
