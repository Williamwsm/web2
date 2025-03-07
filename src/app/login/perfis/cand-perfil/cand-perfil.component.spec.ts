import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandPerfilComponent } from './cand-perfil.component';

describe('CandPerfilComponent', () => {
  let component: CandPerfilComponent;
  let fixture: ComponentFixture<CandPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
