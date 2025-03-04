import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgAbertasComponent } from './vg-abertas.component';

describe('VgAbertasComponent', () => {
  let component: VgAbertasComponent;
  let fixture: ComponentFixture<VgAbertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgAbertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VgAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
