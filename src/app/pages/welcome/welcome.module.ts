import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { ProfilePopupPage } from 'src/app/popup/profile-popup/profile-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
  ],
  entryComponents: [ProfilePopupPage],
  declarations: [WelcomePage, ProfilePopupPage]
})
export class WelcomePageModule {}
