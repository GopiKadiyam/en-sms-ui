import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderListComponent } from './sender-list.component';

describe('SenderListComponent', () => {
  let component: SenderListComponent;
  let fixture: ComponentFixture<SenderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
