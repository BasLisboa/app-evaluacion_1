import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registroPage } from './registro.page';

describe('RegistroPage', () => {
  let component: registroPage;
  let fixture: ComponentFixture<registroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(registroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
