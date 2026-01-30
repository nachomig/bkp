import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Otros } from './otros';

describe('Otros', () => {
  let component: Otros;
  let fixture: ComponentFixture<Otros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Otros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Otros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
