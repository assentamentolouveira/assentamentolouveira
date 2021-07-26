import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradiaFormComponent } from './moradia-form.component';

describe('MoradiaFormComponent', () => {
  let component: MoradiaFormComponent;
  let fixture: ComponentFixture<MoradiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoradiaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoradiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
