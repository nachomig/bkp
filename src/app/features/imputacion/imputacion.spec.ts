import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imputacion } from './imputacion';

describe('Imputacion', () => {
  let component: Imputacion;
  let fixture: ComponentFixture<Imputacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imputacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imputacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
