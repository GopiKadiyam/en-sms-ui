import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscListComponent } from './smsc-list.component';

describe('SmscListComponent', () => {
  let component: SmscListComponent;
  let fixture: ComponentFixture<SmscListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmscListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmscListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
