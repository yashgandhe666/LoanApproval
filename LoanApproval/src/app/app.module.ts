import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule} from '@angular/forms';
import { NewappliComponent } from './newappli/newappli.component';
import { HomeComponent } from './home/home.component';
import { ViewappliComponent } from './viewappli/viewappli.component';

@NgModule({
  declarations: [
    AppComponent,
    NewappliComponent,
    HomeComponent,
    ViewappliComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
