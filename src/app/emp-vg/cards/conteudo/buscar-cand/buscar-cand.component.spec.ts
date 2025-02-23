import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCandComponent } from './buscar-cand.component';

describe('BuscarCandComponent', () => {
  let component: BuscarCandComponent;
  let fixture: ComponentFixture<BuscarCandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarCandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
