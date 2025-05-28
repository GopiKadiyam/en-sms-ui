import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSmscComponent } from './update-smsc.component';

describe('UpdateSmscComponent', () => {
  let component: UpdateSmscComponent;
  let fixture: ComponentFixture<UpdateSmscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSmscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSmscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
