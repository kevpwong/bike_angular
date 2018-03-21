import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotdComponent } from './botd.component';

describe('BotdComponent', () => {
  let component: BotdComponent;
  let fixture: ComponentFixture<BotdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
