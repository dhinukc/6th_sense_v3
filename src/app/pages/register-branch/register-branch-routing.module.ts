import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterBranchPage } from './register-branch.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterBranchPageRoutingModule {}
