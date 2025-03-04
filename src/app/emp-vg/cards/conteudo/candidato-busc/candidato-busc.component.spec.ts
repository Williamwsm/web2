import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoBuscComponent } from './candidato-busc.component';

describe('CandidatoBuscComponent', () => {
  let component: CandidatoBuscComponent;
  let fixture: ComponentFixture<CandidatoBuscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoBuscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoBuscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
