import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCultivos } from './gestion-cultivos';

describe('GestionCultivos', () => {
  let component: GestionCultivos;
  let fixture: ComponentFixture<GestionCultivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCultivos],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionCultivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
