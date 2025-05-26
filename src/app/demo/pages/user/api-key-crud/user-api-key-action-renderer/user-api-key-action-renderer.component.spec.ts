import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiKeyActionRendererComponent } from './user-api-key-action-renderer.component';

describe('UserApiKeyActionRendererComponent', () => {
  let component: UserApiKeyActionRendererComponent;
  let fixture: ComponentFixture<UserApiKeyActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserApiKeyActionRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApiKeyActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
