import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurationPage } from './configuration.page';

describe('ConfigurationPage', () => {
  let component: ConfigurationPage;
  let fixture: ComponentFixture<ConfigurationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
   
    

    fixture = TestBed.createComponent(ConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
   });

  fit('enableDarkMode() should put all body in dark', () => {
    document.body.classList.remove("dark");
     component.enableDarkMode();
     component.enableDarkMode();
    expect(document.body.classList.contains("dark")).toBeFalsy();

  });
});

