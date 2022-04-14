import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterClientsPageRoutingModule } from './register-clients-routing.module';

import { RegisterClientsPage } from './register-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterClientsPageRoutingModule
  ],
  declarations: [RegisterClientsPage]
})
export class RegisterClientsPageModule {}
