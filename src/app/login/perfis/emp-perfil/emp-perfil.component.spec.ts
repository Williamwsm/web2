import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPerfilComponent } from './emp-perfil.component';

describe('EmpPerfilComponent', () => {
  let component: EmpPerfilComponent;
  let fixture: ComponentFixture<EmpPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
