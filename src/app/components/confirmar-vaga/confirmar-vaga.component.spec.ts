import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarVagaComponent } from './confirmar-vaga.component';

describe('ConfirmarVagaComponent', () => {
  let component: ConfirmarVagaComponent;
  let fixture: ComponentFixture<ConfirmarVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarVagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
