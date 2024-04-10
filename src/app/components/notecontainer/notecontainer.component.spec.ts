import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotecontainerComponent } from './notecontainer.component';

describe('NotecontainerComponent', () => {
  let component: NotecontainerComponent;
  let fixture: ComponentFixture<NotecontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotecontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotecontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
