import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLotes } from './gestion-lotes';

describe('GestionLotes', () => {
  let component: GestionLotes;
  let fixture: ComponentFixture<GestionLotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionLotes],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionLotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
