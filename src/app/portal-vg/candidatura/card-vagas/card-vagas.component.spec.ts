import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVagasComponent } from './card-vagas.component';

describe('CardVagasComponent', () => {
  let component: CardVagasComponent;
  let fixture: ComponentFixture<CardVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVagasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
