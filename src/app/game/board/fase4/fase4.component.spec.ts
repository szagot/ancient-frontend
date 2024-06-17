import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase4Component } from './fase4.component';

describe('Fase4Component', () => {
  let component: Fase4Component;
  let fixture: ComponentFixture<Fase4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fase4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fase4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
