import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// QR Code Scanner
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx'

//Http Client
import { HttpClientModule } from '@angular/common/http';

//Storage
import { IonicStorageModule } from '@ionic/storage-angular';

// Native HTTP
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// Intent
import { WebIntent } from '@awesome-cordova-plugins/web-intent/ngx';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';

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
    FileTransferObject,
    PhotoLibrary
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
