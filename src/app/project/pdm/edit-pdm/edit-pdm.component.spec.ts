import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPdmComponent } from './edit-pdm.component';

describe('EditPdmComponent', () => {
  let component: EditPdmComponent;
  let fixture: ComponentFixture<EditPdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
