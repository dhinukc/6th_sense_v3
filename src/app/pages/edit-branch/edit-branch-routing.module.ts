import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBranchPage } from './edit-branch.page';

const routes: Routes = [
  {
    path: '',
    component: EditBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBranchPageRoutingModule {}
