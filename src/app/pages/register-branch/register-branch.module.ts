import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterBranchPageRoutingModule } from './register-branch-routing.module';

import { RegisterBranchPage } from './register-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterBranchPageRoutingModule
  ],
  declarations: [RegisterBranchPage]
})
export class RegisterBranchPageModule {}
