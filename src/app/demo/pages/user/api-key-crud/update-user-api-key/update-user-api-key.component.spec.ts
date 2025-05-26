import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserApiKeyComponent } from './update-user-api-key.component';

describe('UpdateUserApiKeyComponent', () => {
  let component: UpdateUserApiKeyComponent;
  let fixture: ComponentFixture<UpdateUserApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateUserApiKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
