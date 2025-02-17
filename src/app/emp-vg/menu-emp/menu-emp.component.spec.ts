import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEmpComponent } from './menu-emp.component';

describe('MenuEmpComponent', () => {
  let component: MenuEmpComponent;
  let fixture: ComponentFixture<MenuEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
