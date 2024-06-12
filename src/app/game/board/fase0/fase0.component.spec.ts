import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase0Component } from './fase0.component';

describe('Fase0Component', () => {
  let component: Fase0Component;
  let fixture: ComponentFixture<Fase0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fase0Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fase0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
