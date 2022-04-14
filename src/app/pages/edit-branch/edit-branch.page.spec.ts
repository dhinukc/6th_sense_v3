import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBranchPage } from './edit-branch.page';

describe('EditBranchPage', () => {
  let component: EditBranchPage;
  let fixture: ComponentFixture<EditBranchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBranchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
