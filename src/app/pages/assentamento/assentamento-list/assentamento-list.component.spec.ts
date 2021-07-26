import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentamentoListComponent } from './assentamento-list.component';

describe('AssentamentoListComponent', () => {
  let component: AssentamentoListComponent;
  let fixture: ComponentFixture<AssentamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssentamentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssentamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
