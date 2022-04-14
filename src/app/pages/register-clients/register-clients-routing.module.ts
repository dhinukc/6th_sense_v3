import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterClientsPage } from './register-clients.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterClientsPageRoutingModule {}
