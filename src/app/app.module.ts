import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// QR Code Scanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx'

//Http Client
import { HttpClientModule } from '@angular/common/http';

//Storage
import { IonicStorageModule } from '@ionic/storage';

// Native HTTP
import { HTTP } from '@ionic-native/http/ngx';

// Intent
import { WebIntent } from '@ionic-native/web-intent/ngx';

import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    Base64ToGallery,
    HTTP,
    WebIntent,
    File,
    AndroidPermissions,
    Diagnostic,
    FileTransfer,
    FileTransferObject
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
