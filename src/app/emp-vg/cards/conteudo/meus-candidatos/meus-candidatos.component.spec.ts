import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusCandidatosComponent } from './meus-candidatos.component';

describe('MeusCandidatosComponent', () => {
  let component: MeusCandidatosComponent;
  let fixture: ComponentFixture<MeusCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusCandidatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
