/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TermoAceiteComponent } from './termo-aceite.component';

describe('TermoAceiteComponent', () => {
  let component: TermoAceiteComponent;
  let fixture: ComponentFixture<TermoAceiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoAceiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoAceiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
