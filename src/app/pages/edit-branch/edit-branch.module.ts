import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBranchPageRoutingModule } from './edit-branch-routing.module';

import { EditBranchPage } from './edit-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBranchPageRoutingModule
  ],
  declarations: [EditBranchPage]
})
export class EditBranchPageModule {}
