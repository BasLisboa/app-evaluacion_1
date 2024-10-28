import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSqlPage } from './admin-sql.page';

describe('AdminSqlPage', () => {
  let component: AdminSqlPage;
  let fixture: ComponentFixture<AdminSqlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSqlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
