import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'profile-popup',
    loadChildren: () => import('./popup/profile-popup/profile-popup.module').then( m => m.ProfilePopupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'super-dashboard',
    loadChildren: () => import('./pages/superadmin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'branches',
    loadChildren: () => import('./pages/branches/branches.module').then( m => m.BranchesPageModule)
  },
  {
    path: 'register-clients',
    loadChildren: () => import('./pages/register-clients/register-clients.module').then( m => m.RegisterClientsPageModule)
  },
  {
    path: 'machines',
    loadChildren: () => import('./pages/machines/machines.module').then( m => m.MachinesPageModule)
  },
  {
    path: 'register-branch',
    loadChildren: () => import('./pages/register-branch/register-branch.module').then( m => m.RegisterBranchPageModule)
  },
  {
    path: 'register-machine',
    loadChildren: () => import('./pages/register-machine/register-machine.module').then( m => m.RegisterMachinePageModule)
  },
  {
    path: 'popup-download-qr',
    loadChildren: () => import('./popup/download-qr/download-qr.module').then( m => m.DownloadQrPageModule)
  },
  {
    path: 'edit-client',
    loadChildren: () => import('./pages/edit-client/edit-client.module').then( m => m.EditClientPageModule)
  },
  {
    path: 'edit-branch',
    loadChildren: () => import('./pages/edit-branch/edit-branch.module').then( m => m.EditBranchPageModule)
  },
  {
    path: 'download-qr',
    loadChildren: () => import('./pages/download-qr/download-qr.module').then( m => m.DownloadQrPageModule)
  },
  {
    path: 'edit-machine',
    loadChildren: () => import('./pages/edit-machine/edit-machine.module').then( m => m.EditMachinePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
