import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscComponent } from './smsc.component';

describe('SmscComponent', () => {
  let component: SmscComponent;
  let fixture: ComponentFixture<SmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
