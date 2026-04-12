import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlagas } from './gestion-plagas';

describe('GestionPlagas', () => {
  let component: GestionPlagas;
  let fixture: ComponentFixture<GestionPlagas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPlagas],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPlagas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
