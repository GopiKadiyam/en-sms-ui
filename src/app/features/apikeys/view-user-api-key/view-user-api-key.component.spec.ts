import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserApiKeyComponent } from './view-user-api-key.component';

describe('ViewUserApiKeyComponent', () => {
  let component: ViewUserApiKeyComponent;
  let fixture: ComponentFixture<ViewUserApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewUserApiKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
