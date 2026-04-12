import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInspecciones } from './gestion-inspecciones';

describe('GestionInspecciones', () => {
  let component: GestionInspecciones;
  let fixture: ComponentFixture<GestionInspecciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionInspecciones],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionInspecciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
