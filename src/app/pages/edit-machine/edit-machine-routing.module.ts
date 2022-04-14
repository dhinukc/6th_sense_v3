import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMachinePage } from './edit-machine.page';

const routes: Routes = [
  {
    path: '',
    component: EditMachinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMachinePageRoutingModule {}
