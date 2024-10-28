import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarSedePage } from './mostrar-sede.page';

describe('MostrarSedePage', () => {
  let component: MostrarSedePage;
  let fixture: ComponentFixture<MostrarSedePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarSedePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
