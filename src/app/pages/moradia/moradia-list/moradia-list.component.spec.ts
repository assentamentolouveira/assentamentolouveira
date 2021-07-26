import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradiaListComponent } from './moradia-list.component';

describe('MoradiaListComponent', () => {
  let component: MoradiaListComponent;
  let fixture: ComponentFixture<MoradiaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoradiaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoradiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
