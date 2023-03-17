import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandDialogComponent } from './add-demand-dialog.component';

describe('AddDemandDialogComponent', () => {
  let component: AddDemandDialogComponent;
  let fixture: ComponentFixture<AddDemandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemandDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
