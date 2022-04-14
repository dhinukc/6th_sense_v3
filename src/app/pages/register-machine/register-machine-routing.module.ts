import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterMachinePage } from './register-machine.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterMachinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterMachinePageRoutingModule {}
