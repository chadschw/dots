import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { DotsComponent } from './dots.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ 
    AppComponent,
    DotsComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
