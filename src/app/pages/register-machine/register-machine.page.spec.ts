import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterMachinePage } from './register-machine.page';

describe('RegisterMachinePage', () => {
  let component: RegisterMachinePage;
  let fixture: ComponentFixture<RegisterMachinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMachinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterMachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
