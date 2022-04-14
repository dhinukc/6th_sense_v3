import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMachinePageRoutingModule } from './register-machine-routing.module';

import { RegisterMachinePage } from './register-machine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterMachinePageRoutingModule
  ],
  declarations: [RegisterMachinePage]
})
export class RegisterMachinePageModule {}
