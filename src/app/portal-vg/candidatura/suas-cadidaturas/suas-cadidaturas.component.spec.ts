import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuasCadidaturasComponent } from './suas-cadidaturas.component';

describe('SuasCadidaturasComponent', () => {
  let component: SuasCadidaturasComponent;
  let fixture: ComponentFixture<SuasCadidaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuasCadidaturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuasCadidaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
