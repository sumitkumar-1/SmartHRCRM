import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandHandlerDialogComponent } from './demand-handler-dialog.component';

describe('DemandHandlerDialogComponent', () => {
  let component: DemandHandlerDialogComponent;
  let fixture: ComponentFixture<DemandHandlerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandHandlerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandHandlerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
