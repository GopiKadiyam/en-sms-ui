import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderActionRendererComponent } from './provider-action-renderer.component';

describe('ProviderActionRendererComponent', () => {
  let component: ProviderActionRendererComponent;
  let fixture: ComponentFixture<ProviderActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderActionRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
