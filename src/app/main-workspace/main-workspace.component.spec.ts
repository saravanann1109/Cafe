import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWorkspaceComponent } from './main-workspace.component';

describe('MainWorkspaceComponent', () => {
  let component: MainWorkspaceComponent;
  let fixture: ComponentFixture<MainWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
