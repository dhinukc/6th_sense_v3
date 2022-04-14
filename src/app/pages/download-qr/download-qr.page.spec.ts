import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DownloadQrPage } from './download-qr.page';

describe('DownloadQrPage', () => {
  let component: DownloadQrPage;
  let fixture: ComponentFixture<DownloadQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
