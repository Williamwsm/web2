import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVagaComponent } from './add-vaga.component';

describe('AddVagaComponent', () => {
  let component: AddVagaComponent;
  let fixture: ComponentFixture<AddVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
