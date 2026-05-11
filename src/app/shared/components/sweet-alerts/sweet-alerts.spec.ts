import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetAlerts } from './sweet-alerts';

describe('SweetAlerts', () => {
  let component: SweetAlerts;
  let fixture: ComponentFixture<SweetAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetAlerts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweetAlerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
