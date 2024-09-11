import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioPswPage } from './cambio-psw.page';

describe('CambioPswPage', () => {
  let component: CambioPswPage;
  let fixture: ComponentFixture<CambioPswPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPswPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
