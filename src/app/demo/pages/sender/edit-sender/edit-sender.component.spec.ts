import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSenderComponent } from './edit-sender.component';

describe('EditSenderComponent', () => {
  let component: EditSenderComponent;
  let fixture: ComponentFixture<EditSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
