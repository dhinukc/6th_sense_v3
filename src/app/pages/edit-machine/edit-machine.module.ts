import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMachinePageRoutingModule } from './edit-machine-routing.module';

import { EditMachinePage } from './edit-machine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMachinePageRoutingModule
  ],
  declarations: [EditMachinePage]
})
export class EditMachinePageModule {}
