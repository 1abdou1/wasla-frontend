import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAlertComponent } from './module-alert.component';

describe('ModuleAlertComponent', () => {
  let component: ModuleAlertComponent;
  let fixture: ComponentFixture<ModuleAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
